"use client";

import type React from "react";
import { useState } from "react";
import type { Product } from "../types";
import { Button } from "./ui/Button";
import { cartService } from "../services/cartService";
import { useAuth } from "../hooks/useAuth";
import { Alert } from "./ui/Alert";

interface ProductCardProps {
    product: Product;
    onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
}) => {
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            setAlert({
                type: "error",
                message:
                    "Debes iniciar sesión para agregar productos al carrito",
            });
            return;
        }

        setLoading(true);
        try {
            await cartService.addToCart({ productId: product.id, quantity: 1 });
            setAlert({
                type: "success",
                message: "Producto agregado al carrito",
            });
            onAddToCart?.();
        } catch (error) {
            setAlert({
                type: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "Error al agregar al carrito",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {alert && (
                <div className="p-4">
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}

            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                    />
                ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                    </h3>
                    {product.category && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {product.category}
                        </span>
                    )}
                </div>

                {product.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                    </p>
                )}

                <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-indigo-600">
                        ${product.price.toFixed(2)}
                    </span>
                    <span
                        className={`text-sm ${
                            product.stock > 0
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {product.stock > 0
                            ? `${product.stock} disponibles`
                            : "Sin stock"}
                    </span>
                </div>

                <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || !product.isActive}
                    loading={loading}
                    className="w-full"
                >
                    {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
                </Button>
            </div>
        </div>
    );
};
