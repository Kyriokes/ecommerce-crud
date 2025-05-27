"use client";

import type React from "react";
import { Button } from "./ui/Button";
import type { Product } from "../types";

interface ProductCardProps {
    product: Product;
    onAddToCart: () => void;
    isAuthenticated: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
    isAuthenticated,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-1 aspect-h-1">
                <img
                    className="w-full h-48 object-cover"
                    src={
                        product.imageUrl ||
                        "/placeholder.svg?height=200&width=200"
                    }
                    alt={product.name}
                />
            </div>

            <div className="p-4">
                <div className="mb-2">
                    {product.category && (
                        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                            {product.category}
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                </h3>

                {product.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                    </p>
                )}

                <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-indigo-600">
                        ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                        Stock: {product.stock}
                    </span>
                </div>

                <Button
                    onClick={onAddToCart}
                    className="w-full"
                    disabled={product.stock === 0 || !isAuthenticated}
                >
                    {product.stock === 0
                        ? "Sin Stock"
                        : !isAuthenticated
                        ? "Inicia Sesión para Comprar"
                        : "Agregar al Carrito"}
                </Button>

                {product.stock > 0 && product.stock <= 5 && (
                    <p className="text-xs text-orange-600 mt-2 text-center">
                        ¡Solo quedan {product.stock} unidades!
                    </p>
                )}
            </div>
        </div>
    );
};
