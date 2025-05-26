"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { cartService } from "../services/cartService";
import type { CartItem } from "../types";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";

export const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            setLoading(true);
            const data = await cartService.getCart();
            setCartItems(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Error al cargar el carrito"
            );
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setUpdatingItems((prev) => new Set(prev).add(itemId));
        try {
            await cartService.updateCartItem(itemId, newQuantity);
            setCartItems((prev) =>
                prev.map((item) =>
                    item.id === itemId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Error al actualizar cantidad"
            );
        } finally {
            setUpdatingItems((prev) => {
                const newSet = new Set(prev);
                newSet.delete(itemId);
                return newSet;
            });
        }
    };

    const removeItem = async (itemId: number) => {
        setUpdatingItems((prev) => new Set(prev).add(itemId));
        try {
            await cartService.removeFromCart(itemId);
            setCartItems((prev) => prev.filter((item) => item.id !== itemId));
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Error al eliminar producto"
            );
        } finally {
            setUpdatingItems((prev) => {
                const newSet = new Set(prev);
                newSet.delete(itemId);
                return newSet;
            });
        }
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando carrito...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Tu Carrito
                </h1>

                {error && (
                    <div className="mb-6">
                        <Alert
                            type="error"
                            message={error}
                            onClose={() => setError(null)}
                        />
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <svg
                            className="w-12 h-12 text-gray-400 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0L4 5M7 13h10M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                            />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Tu carrito está vacío
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Agrega algunos productos para comenzar tu compra.
                        </p>
                        <Button
                            onClick={() => (window.location.href = "/products")}
                        >
                            Explorar Productos
                        </Button>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">
                                {cartItems.length}{" "}
                                {cartItems.length === 1
                                    ? "producto"
                                    : "productos"}{" "}
                                en tu carrito
                            </h2>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-6 flex items-center space-x-4"
                                >
                                    <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                                        {item.product.imageUrl ? (
                                            <img
                                                src={
                                                    item.product.imageUrl ||
                                                    "/placeholder.svg"
                                                }
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                                <svg
                                                    className="w-8 h-8 text-gray-400"
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

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {item.product.name}
                                        </h3>
                                        {item.product.description && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                {item.product.description}
                                            </p>
                                        )}
                                        <p className="text-lg font-semibold text-indigo-600 mt-2">
                                            ${item.product.price.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={
                                                item.quantity <= 1 ||
                                                updatingItems.has(item.id)
                                            }
                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M20 12H4"
                                                />
                                            </svg>
                                        </button>

                                        <span className="w-12 text-center font-medium text-gray-900">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                            disabled={updatingItems.has(
                                                item.id
                                            )}
                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-gray-900">
                                            $
                                            {(
                                                item.product.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </p>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => removeItem(item.id)}
                                            loading={updatingItems.has(item.id)}
                                            className="mt-2"
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium text-gray-900">
                                        Total: ${total.toFixed(2)}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Envío calculado en el checkout
                                    </p>
                                </div>
                                <Button size="lg" className="ml-4">
                                    Proceder al Pago
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
