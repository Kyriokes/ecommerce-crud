import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtHeader, type SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

// Validación de variables de entorno
const supabaseUrl = process.env.SUPABASE_URL;
if (!supabaseUrl) {
    throw new Error("SUPABASE_URL environment variable is required");
}

const client = jwksClient({
    jwksUri: `${supabaseUrl}/.well-known/jwks.json`,
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 600000, // 10 minutes
});

interface AuthRequest extends Request {
    userId?: string;
}

function getKey(header: JwtHeader, callback: SigningKeyCallback) {
    if (!header.kid) {
        return callback(new Error("No kid found in token header"), undefined);
    }

    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            console.error("💥 Error getting signing key:", err);
            callback(err, undefined);
            return;
        }
        const signingKey = key?.getPublicKey();
        callback(null, signingKey);
    });
}

export function authenticateSupabase(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    console.log(
        "🔐 Auth header received:",
        authHeader ? "Bearer token present" : "No auth header"
    );

    if (!authHeader?.startsWith("Bearer ")) {
        console.log("❌ Authorization header missing or invalid format");
        return res.status(401).json({
            message: "Authorization header missing or invalid format",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        console.log("❌ Token missing from Bearer header");
        return res.status(401).json({ message: "Token missing" });
    }

    console.log("🎫 Token extracted, length:", token.length);

    // For development/testing - if it's a fake token, extract user ID
    if (token.startsWith("fake-jwt-token-")) {
        const userId = token.replace("fake-jwt-token-", "");
        console.log("🧪 Using fake token for development, user ID:", userId);
        req.userId = userId;
        return next();
    }

    jwt.verify(
        token,
        getKey,
        {
            issuer: supabaseUrl,
            algorithms: ["RS256"],
        },
        (err, decoded) => {
            if (err) {
                console.error("💥 JWT verification error:", err.message);
                return res.status(401).json({
                    message: "Token invalid or expired",
                });
            }

            if (!decoded || typeof decoded === "string") {
                console.log("❌ Invalid token payload");
                return res.status(401).json({
                    message: "Invalid token payload",
                });
            }

            const userId = (decoded as any).sub;
            console.log("✅ Token verified successfully, user ID:", userId);
            req.userId = userId;
            next();
        }
    );
}
