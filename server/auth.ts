import { hash, compare } from "bcryptjs";
import { randomBytes, createHash } from "crypto";
import type { Request, Response, NextFunction } from "express";
import { storage } from "./storage.js";
import type { User, Session } from "@shared/schema";

const SESSION_COOKIE = "sid";
const SESSION_DURATION_DAYS = 7;
const REMEMBER_ME_DURATION_DAYS = 30;
const BCRYPT_ROUNDS = 12;

export const DUMMY_HASH = "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.6FU8qB.6gJDOzS";

export async function hashPassword(password: string): Promise<string> {
  return hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return compare(password, hash);
}

export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function getSessionExpiry(rememberMe: boolean = false): Date {
  const days = rememberMe ? REMEMBER_ME_DURATION_DAYS : SESSION_DURATION_DAYS;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

export function getTokenExpiry(hours: number = 24): Date {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

export function setSessionCookie(res: Response, sessionId: string, rememberMe: boolean = false): void {
  const maxAge = rememberMe 
    ? REMEMBER_ME_DURATION_DAYS * 24 * 60 * 60 * 1000 
    : SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000;
  
  res.cookie(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
    path: "/",
  });
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(SESSION_COOKIE, { path: "/" });
}

export function getSessionIdFromRequest(req: Request): string | undefined {
  return req.cookies?.[SESSION_COOKIE];
}

export function getClientIp(req: Request): string | undefined {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress;
}

export function getUserAgent(req: Request): string | undefined {
  return req.headers["user-agent"];
}

export interface AuthenticatedRequest extends Request {
  user?: User;
  session?: Session;
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const sessionId = getSessionIdFromRequest(req);
    if (!sessionId) {
      next();
      return;
    }

    const sessionWithUser = await storage.getValidSession(sessionId);
    if (!sessionWithUser) {
      clearSessionCookie(res);
      next();
      return;
    }

    req.user = sessionWithUser.user;
    req.session = sessionWithUser;

    storage.updateSessionLastSeen(sessionId).catch(() => {});

    next();
  } catch (error) {
    next();
  }
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  next();
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(maxAttempts: number, windowMinutes: number) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = getClientIp(req) || "unknown";
    const key = `${req.path}:${ip}`;
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;

    let entry = rateLimitMap.get(key);
    
    if (!entry || entry.resetAt < now) {
      entry = { count: 0, resetAt: now + windowMs };
      rateLimitMap.set(key, entry);
    }

    entry.count++;

    if (entry.count > maxAttempts) {
      res.status(429).json({ 
        error: "Too many attempts. Please try again later.",
        retryAfter: Math.ceil((entry.resetAt - now) / 1000)
      });
      return;
    }

    next();
  };
}

setInterval(() => {
  const now = Date.now();
  Array.from(rateLimitMap.entries()).forEach(([key, entry]) => {
    if (entry.resetAt < now) {
      rateLimitMap.delete(key);
    }
  });
}, 60000);

export function sanitizeUser(user: User): Omit<User, "passwordHash" | "mfaSecret"> {
  const { passwordHash, mfaSecret, ...safeUser } = user;
  return safeUser;
}
