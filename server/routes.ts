import type { Express } from "express";
import { type Server } from "http";
import cookieParser from "cookie-parser";
import { storage } from "./storage.js";
import { insertProductSchema, insertOrderSchema, registerSchema, loginSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import {
  hashPassword,
  verifyPassword,
  getSessionExpiry,
  setSessionCookie,
  clearSessionCookie,
  getClientIp,
  getUserAgent,
  authMiddleware,
  requireAuth,
  rateLimit,
  sanitizeUser,
  DUMMY_HASH,
  type AuthenticatedRequest,
} from "./auth.js";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.use(cookieParser());
  app.use(authMiddleware);

  // ============ AUTH ROUTES ============

  // Register
  app.post("/api/auth/register", rateLimit(5, 15), async (req, res) => {
    try {
      const result = registerSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: fromZodError(result.error).message });
      }

      const { email, password, displayName } = result.data;

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "An account with this email already exists" });
      }

      const passwordHash = await hashPassword(password);
      const user = await storage.createUser({
        email,
        passwordHash,
        displayName: displayName || email.split("@")[0],
      });

      const session = await storage.createSession(
        user.id,
        getSessionExpiry(false),
        getClientIp(req),
        getUserAgent(req)
      );

      setSessionCookie(res, session.id, false);

      res.status(201).json({ 
        user: sanitizeUser(user),
        message: "Account created successfully" 
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Failed to create account" });
    }
  });

  // Login
  app.post("/api/auth/login", rateLimit(10, 15), async (req, res) => {
    try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: fromZodError(result.error).message });
      }

      const { email, password, rememberMe } = result.data;

      const user = await storage.getUserByEmail(email);
      
      // Always perform bcrypt comparison to prevent timing attacks
      const hashToCompare = user?.passwordHash || DUMMY_HASH;
      const valid = await verifyPassword(password, hashToCompare);
      
      if (!user || !user.passwordHash || !valid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      if (user.status === "locked") {
        return res.status(403).json({ error: "Account is locked. Please contact support." });
      }

      const session = await storage.createSession(
        user.id,
        getSessionExpiry(rememberMe),
        getClientIp(req),
        getUserAgent(req)
      );

      setSessionCookie(res, session.id, rememberMe);

      res.json({ 
        user: sanitizeUser(user),
        message: "Login successful" 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Failed to log in" });
    }
  });

  // Logout
  app.post("/api/auth/logout", async (req: AuthenticatedRequest, res) => {
    try {
      if (req.session) {
        await storage.revokeSession(req.session.id);
      }
      clearSessionCookie(res);
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      clearSessionCookie(res);
      res.json({ message: "Logged out" });
    }
  });

  // Logout everywhere
  app.post("/api/auth/logout-all", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      if (req.user) {
        await storage.revokeAllUserSessions(req.user.id);
      }
      clearSessionCookie(res);
      res.json({ message: "Logged out from all devices" });
    } catch (error) {
      console.error("Logout all error:", error);
      res.status(500).json({ error: "Failed to logout from all devices" });
    }
  });

  // Get current user
  app.get("/api/auth/me", async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
      return res.status(401).json({ user: null });
    }
    res.json({ user: sanitizeUser(req.user) });
  });

  // Get user sessions
  app.get("/api/auth/sessions", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const sessions = await storage.getUserSessions(req.user.id);
      const currentSessionId = req.session?.id;
      
      const sessionList = sessions.map(s => ({
        id: s.id,
        isCurrent: s.id === currentSessionId,
        lastSeenAt: s.lastSeenAt,
        createdAt: s.createdAt,
        ipAddress: s.ipAddress,
        userAgent: s.userAgent,
      }));
      
      res.json({ sessions: sessionList });
    } catch (error) {
      console.error("Get sessions error:", error);
      res.status(500).json({ error: "Failed to get sessions" });
    }
  });

  // Revoke a specific session
  app.delete("/api/auth/sessions/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const sessionId = req.params.id;
      const sessions = await storage.getUserSessions(req.user!.id);
      
      if (!sessions.find(s => s.id === sessionId)) {
        return res.status(404).json({ error: "Session not found" });
      }
      
      await storage.revokeSession(sessionId);
      
      if (sessionId === req.session?.id) {
        clearSessionCookie(res);
      }
      
      res.json({ message: "Session revoked" });
    } catch (error) {
      console.error("Revoke session error:", error);
      res.status(500).json({ error: "Failed to revoke session" });
    }
  });

  // Update profile
  app.patch("/api/auth/profile", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const { displayName } = req.body;
      
      if (displayName !== undefined && (typeof displayName !== "string" || displayName.length > 50)) {
        return res.status(400).json({ error: "Display name must be 50 characters or less" });
      }
      
      const updatedUser = await storage.updateUser(req.user!.id, {
        displayName: displayName || null,
      });
      
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({ user: sanitizeUser(updatedUser), message: "Profile updated" });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // Change password
  app.post("/api/auth/change-password", requireAuth, rateLimit(5, 15), async (req: AuthenticatedRequest, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Current and new password are required" });
      }
      
      // Validate password complexity (must match UI requirements)
      if (newPassword.length < 12) {
        return res.status(400).json({ error: "New password must be at least 12 characters" });
      }
      
      if (!/\d/.test(newPassword)) {
        return res.status(400).json({ error: "New password must contain at least one number" });
      }
      
      if (!/[A-Z]/.test(newPassword)) {
        return res.status(400).json({ error: "New password must contain at least one uppercase letter" });
      }
      
      if (!req.user?.passwordHash) {
        return res.status(400).json({ error: "No password set" });
      }
      
      const valid = await verifyPassword(currentPassword, req.user.passwordHash);
      if (!valid) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }
      
      const newPasswordHash = await hashPassword(newPassword);
      await storage.updateUser(req.user.id, { passwordHash: newPasswordHash });
      
      // Revoke all other sessions for security
      const sessions = await storage.getUserSessions(req.user.id);
      for (const session of sessions) {
        if (session.id !== req.session?.id) {
          await storage.revokeSession(session.id);
        }
      }
      
      res.json({ message: "Password changed successfully. Other sessions have been logged out." });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({ error: "Failed to change password" });
    }
  });

  // Request email verification (simulated - would send email in production)
  app.post("/api/auth/request-verification", requireAuth, rateLimit(3, 60), async (req: AuthenticatedRequest, res) => {
    try {
      if (req.user?.emailVerifiedAt) {
        return res.status(400).json({ error: "Email is already verified" });
      }
      
      // In production, this would send an actual email
      // For now, we'll auto-verify after a short delay to demonstrate the flow
      await storage.updateUser(req.user!.id, { emailVerifiedAt: new Date() });
      
      res.json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("Request verification error:", error);
      res.status(500).json({ error: "Failed to send verification email" });
    }
  });

  // ============ PRODUCT ROUTES ============

  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const allProducts = await storage.getAllProducts();
      res.json(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Get products by category
  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const categoryProducts = await storage.getProductsByCategory(category);
      res.json(categoryProducts);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Create a new product (admin only - add auth later if needed)
  app.post("/api/products", async (req, res) => {
    try {
      const result = insertProductSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: fromZodError(result.error).message 
        });
      }
      
      const product = await storage.createProduct(result.data);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  // ============ ORDER ROUTES ============

  // Create an order
  app.post("/api/orders", async (req: AuthenticatedRequest, res) => {
    try {
      const result = insertOrderSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: fromZodError(result.error).message 
        });
      }
      
      const orderData = {
        ...result.data,
        userId: req.user?.id,
      };
      
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Get user's orders
  app.get("/api/orders", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const orders = await storage.getUserOrders(req.user!.id);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // Get order by ID
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid order ID" });
      }
      
      const order = await storage.getOrderById(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  // Update order status (for webhook/payment confirmation)
  app.patch("/api/orders/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid order ID" });
      }
      
      const { status, paymentIntentId } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }
      
      const order = await storage.updateOrderStatus(id, status, paymentIntentId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  // ============ WISHLIST ROUTES ============

  // Get user's wishlist
  app.get("/api/wishlist", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const items = await storage.getWishlistItems(req.user!.id);
      res.json(items);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  });

  // Add to wishlist
  app.post("/api/wishlist/:productId", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const productId = parseInt(req.params.productId);
      if (isNaN(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const product = await storage.getProductById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const exists = await storage.isInWishlist(req.user!.id, productId);
      if (exists) {
        return res.status(409).json({ error: "Product already in wishlist" });
      }

      const item = await storage.addToWishlist(req.user!.id, productId);
      res.status(201).json(item);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      res.status(500).json({ error: "Failed to add to wishlist" });
    }
  });

  // Remove from wishlist
  app.delete("/api/wishlist/:productId", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const productId = parseInt(req.params.productId);
      if (isNaN(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      await storage.removeFromWishlist(req.user!.id, productId);
      res.json({ message: "Removed from wishlist" });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      res.status(500).json({ error: "Failed to remove from wishlist" });
    }
  });

  // Check if product is in wishlist
  app.get("/api/wishlist/check/:productId", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const productId = parseInt(req.params.productId);
      if (isNaN(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const inWishlist = await storage.isInWishlist(req.user!.id, productId);
      res.json({ inWishlist });
    } catch (error) {
      console.error("Error checking wishlist:", error);
      res.status(500).json({ error: "Failed to check wishlist" });
    }
  });

  return httpServer;
}
