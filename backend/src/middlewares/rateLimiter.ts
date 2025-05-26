import type { Request, Response, NextFunction } from "express";

interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

const store: RateLimitStore = {};

export const createRateLimiter = (windowMs: number, maxRequests: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Skip rate limiting in development
        if (process.env.NODE_ENV === "development") {
            return next();
        }

        const key = req.ip || "unknown";
        const now = Date.now();

        // Clean up expired entries
        if (store[key] && now > store[key].resetTime) {
            delete store[key];
        }

        // Initialize or update counter
        if (!store[key]) {
            store[key] = {
                count: 1,
                resetTime: now + windowMs,
            };
        } else {
            store[key].count++;
        }

        // Check if limit exceeded
        if (store[key].count > maxRequests) {
            return res.status(429).json({
                message: "Too many requests, please try again later",
                retryAfter: Math.ceil((store[key].resetTime - now) / 1000),
            });
        }

        // Add headers
        res.set({
            "X-RateLimit-Limit": maxRequests.toString(),
            "X-RateLimit-Remaining": Math.max(
                0,
                maxRequests - store[key].count
            ).toString(),
            "X-RateLimit-Reset": new Date(store[key].resetTime).toISOString(),
        });

        next();
    };
};

// Predefined rate limiters - more permissive for development
export const generalLimiter = createRateLimiter(15 * 60 * 1000, 1000); // 1000 requests per 15 minutes
export const authLimiter = createRateLimiter(15 * 60 * 1000, 50); // 50 requests per 15 minutes for auth
export const strictLimiter = createRateLimiter(60 * 1000, 100); // 100 requests per minute
