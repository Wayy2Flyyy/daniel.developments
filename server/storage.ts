import { eq, and, isNull, lt, desc, count, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { 
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct,
  type Order,
  type InsertOrder,
  type Session,
  type WishlistItem,
  type AdminSetup,
  users, 
  products,
  orders,
  sessions,
  emailVerificationTokens,
  passwordResetTokens,
  wishlistItems,
  adminSetup
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User | undefined>;
  
  // Sessions
  createSession(userId: string, expiresAt: Date, ip?: string, userAgent?: string): Promise<Session>;
  getSession(id: string): Promise<Session | undefined>;
  getValidSession(id: string): Promise<(Session & { user: User }) | undefined>;
  getUserSessions(userId: string): Promise<Session[]>;
  updateSessionLastSeen(id: string): Promise<void>;
  revokeSession(id: string): Promise<void>;
  revokeAllUserSessions(userId: string): Promise<void>;
  
  // Email Verification
  createEmailVerificationToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void>;
  getEmailVerificationToken(tokenHash: string): Promise<{ userId: string; expiresAt: Date; usedAt: Date | null } | undefined>;
  markEmailVerificationTokenUsed(tokenHash: string): Promise<void>;
  
  // Password Reset
  createPasswordResetToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void>;
  getPasswordResetToken(tokenHash: string): Promise<{ userId: string; expiresAt: Date; usedAt: Date | null } | undefined>;
  markPasswordResetTokenUsed(tokenHash: string): Promise<void>;
  
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: number): Promise<Order | undefined>;
  getUserOrders(userId: string): Promise<Order[]>;
  updateOrderStatus(id: number, status: string, paymentIntentId?: string): Promise<Order | undefined>;
  
  // Wishlist
  getWishlistItems(userId: string): Promise<(WishlistItem & { product: Product })[]>;
  addToWishlist(userId: string, productId: number): Promise<WishlistItem>;
  removeFromWishlist(userId: string, productId: number): Promise<void>;
  isInWishlist(userId: string, productId: number): Promise<boolean>;

  // Admin
  isAdminSetupComplete(): Promise<boolean>;
  completeAdminSetup(adminId: string): Promise<void>;
  getAllUsers(): Promise<User[]>;
  deleteUser(id: string): Promise<void>;
  getAllOrders(): Promise<Order[]>;
  getAllSessions(): Promise<(Session & { user: User })[]>;
  updateProduct(id: number, data: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<void>;
  getAnalytics(): Promise<{
    totalUsers: number;
    totalOrders: number;
    totalProducts: number;
    totalRevenue: number;
    recentOrders: Order[];
  }>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({
      email: insertUser.email.toLowerCase(),
      passwordHash: insertUser.passwordHash,
      displayName: insertUser.displayName,
      role: insertUser.role,
    }).returning();
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Sessions
  async createSession(userId: string, expiresAt: Date, ip?: string, userAgent?: string): Promise<Session> {
    const [session] = await db.insert(sessions).values({
      userId,
      expiresAt,
      ipAddress: ip,
      userAgent,
    }).returning();
    return session;
  }

  async getSession(id: string): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.id, id)).limit(1);
    return session;
  }

  async getValidSession(id: string): Promise<(Session & { user: User }) | undefined> {
    const now = new Date();
    const result = await db
      .select()
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(
        and(
          eq(sessions.id, id),
          isNull(sessions.revokedAt),
        )
      )
      .limit(1);
    
    if (!result.length) return undefined;
    
    const session = result[0].sessions;
    const user = result[0].users;
    
    // Check if expired
    if (session.expiresAt < now) return undefined;
    
    return { ...session, user };
  }

  async getUserSessions(userId: string): Promise<Session[]> {
    return await db.select().from(sessions)
      .where(and(eq(sessions.userId, userId), isNull(sessions.revokedAt)));
  }

  async updateSessionLastSeen(id: string): Promise<void> {
    await db.update(sessions).set({ lastSeenAt: new Date() }).where(eq(sessions.id, id));
  }

  async revokeSession(id: string): Promise<void> {
    await db.update(sessions).set({ revokedAt: new Date() }).where(eq(sessions.id, id));
  }

  async revokeAllUserSessions(userId: string): Promise<void> {
    await db.update(sessions).set({ revokedAt: new Date() }).where(eq(sessions.userId, userId));
  }

  // Email Verification
  async createEmailVerificationToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void> {
    await db.insert(emailVerificationTokens).values({ userId, tokenHash, expiresAt });
  }

  async getEmailVerificationToken(tokenHash: string): Promise<{ userId: string; expiresAt: Date; usedAt: Date | null } | undefined> {
    const [token] = await db.select().from(emailVerificationTokens).where(eq(emailVerificationTokens.tokenHash, tokenHash)).limit(1);
    return token ? { userId: token.userId, expiresAt: token.expiresAt, usedAt: token.usedAt } : undefined;
  }

  async markEmailVerificationTokenUsed(tokenHash: string): Promise<void> {
    await db.update(emailVerificationTokens).set({ usedAt: new Date() }).where(eq(emailVerificationTokens.tokenHash, tokenHash));
  }

  // Password Reset
  async createPasswordResetToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void> {
    await db.insert(passwordResetTokens).values({ userId, tokenHash, expiresAt });
  }

  async getPasswordResetToken(tokenHash: string): Promise<{ userId: string; expiresAt: Date; usedAt: Date | null } | undefined> {
    const [token] = await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.tokenHash, tokenHash)).limit(1);
    return token ? { userId: token.userId, expiresAt: token.expiresAt, usedAt: token.usedAt } : undefined;
  }

  async markPasswordResetTokenUsed(tokenHash: string): Promise<void> {
    await db.update(passwordResetTokens).set({ usedAt: new Date() }).where(eq(passwordResetTokens.tokenHash, tokenHash));
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return product;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  // Orders
  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    return order;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.userId, userId));
  }

  async updateOrderStatus(id: number, status: string, paymentIntentId?: string): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set({ 
        status,
        ...(paymentIntentId && { stripePaymentIntentId: paymentIntentId })
      })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  // Wishlist
  async getWishlistItems(userId: string): Promise<(WishlistItem & { product: Product })[]> {
    const items = await db
      .select()
      .from(wishlistItems)
      .innerJoin(products, eq(wishlistItems.productId, products.id))
      .where(eq(wishlistItems.userId, userId));
    
    return items.map(row => ({
      ...row.wishlist_items,
      product: row.products
    }));
  }

  async addToWishlist(userId: string, productId: number): Promise<WishlistItem> {
    const [item] = await db.insert(wishlistItems).values({
      userId,
      productId,
    }).returning();
    return item;
  }

  async removeFromWishlist(userId: string, productId: number): Promise<void> {
    await db.delete(wishlistItems).where(
      and(eq(wishlistItems.userId, userId), eq(wishlistItems.productId, productId))
    );
  }

  async isInWishlist(userId: string, productId: number): Promise<boolean> {
    const [item] = await db
      .select()
      .from(wishlistItems)
      .where(and(eq(wishlistItems.userId, userId), eq(wishlistItems.productId, productId)))
      .limit(1);
    return !!item;
  }

  // Admin
  async isAdminSetupComplete(): Promise<boolean> {
    const [setup] = await db.select().from(adminSetup).limit(1);
    return setup?.isComplete ?? false;
  }

  async completeAdminSetup(adminId: string): Promise<void> {
    const [existing] = await db.select().from(adminSetup).limit(1);
    if (existing) {
      await db.update(adminSetup).set({ isComplete: true, completedAt: new Date(), completedBy: adminId }).where(eq(adminSetup.id, existing.id));
    } else {
      await db.insert(adminSetup).values({ isComplete: true, completedAt: new Date(), completedBy: adminId });
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getAllSessions(): Promise<(Session & { user: User })[]> {
    const result = await db
      .select()
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(isNull(sessions.revokedAt))
      .orderBy(desc(sessions.lastSeenAt));
    
    return result.map(row => ({
      ...row.sessions,
      user: row.users
    }));
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<Product | undefined> {
    const [product] = await db.update(products).set(data).where(eq(products.id, id)).returning();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  async getAnalytics(): Promise<{
    totalUsers: number;
    totalOrders: number;
    totalProducts: number;
    totalRevenue: number;
    recentOrders: Order[];
  }> {
    const [userCount] = await db.select({ count: count() }).from(users);
    const [orderCount] = await db.select({ count: count() }).from(orders);
    const [productCount] = await db.select({ count: count() }).from(products);
    
    const [revenueResult] = await db.select({ 
      total: sql<number>`COALESCE(SUM(${orders.total}), 0)` 
    }).from(orders).where(eq(orders.status, "completed"));
    
    const recentOrders = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(10);
    
    return {
      totalUsers: userCount?.count ?? 0,
      totalOrders: orderCount?.count ?? 0,
      totalProducts: productCount?.count ?? 0,
      totalRevenue: Number(revenueResult?.total ?? 0),
      recentOrders,
    };
  }
}

export const storage = new DatabaseStorage();
