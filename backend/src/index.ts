import dotenv from "dotenv";
dotenv.config();

import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import cors from "cors";
import { productRoutes } from "./routes/productRoutes";
import { userRoutes } from "./routes/userRoutes";
import { cartRoutes } from "./routes/cartRoutes";
import { authRoutes } from "./routes/authRoutes";


// ✅ Validación de variables de entorno requeridas
const requiredEnvVars = ["DATABASE_URL", "SUPABASE_URL"];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Configuración de CORS más específica
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (_req: Request, res: Response) => {
    res.json({
        message: "Ecommerce API Server is running!",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: "/api/auth",
            products: "/api/products",
            users: "/api/users",
            cart: "/api/cart",
        },
    });
});

app.get("/health", (_req: Request, res: Response) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
    });
});

// ✅ Manejo de rutas no encontradas
app.use("*", (_req: Request, res: Response) => {
    res.status(404).json({
        error: "Route not found",
        message: "The requested endpoint does not exist",
    });
});

// ✅ Manejo global de errores mejorado
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Global error handler:", err);

    if (err.name === "ValidationError") {
        return res.status(400).json({
            error: "Validation Error",
            message: err.message,
        });
    }

    if (err.name === "UnauthorizedError") {
        return res.status(401).json({
            error: "Unauthorized",
            message: "Invalid or expired token",
        });
    }

    res.status(500).json({
        error: "Internal Server Error",
        message:
            process.env.NODE_ENV === "production"
                ? "Something went wrong"
                : err.message,
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
    console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
});

export default app;