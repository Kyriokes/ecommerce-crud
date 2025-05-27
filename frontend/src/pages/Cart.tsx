"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { cartService } from "../services/cartService";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import type { CartItem } from "../types";

export const Cart: React.FC = () => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<number | null>(null);
    const [alert, setAlert] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    console.log(
        "🛒 [CART] Rendering with user:",
        user ? `${user.username} (ID: ${user.id})` : "null"
    );

    useEffect(() => {
        if (user) {
            loadCart();
        }
    }, [user]);

    const loadCart = async () => {
        try {
            setLoading(true);
            console.log("🛒 [CART] Loading cart items...");
            const items = await cartService.getCart();
            console.log("🛒 [CART] Cart items loaded:", items.length);
            setCartItems(items);
        } catch (error) {
            console.error("💥 [CART] Error loading cart:", error);
            setAlert({
                type: "error",
                message: "Error al cargar el carrito",
            });
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        try {
            setUpdating(itemId);
            console.log(
                "🛒 [CART] Updating quantity:",
                itemId,
                "to",
                newQuantity
            );
            await cartService.updateCartItem(itemId, newQuantity);
            setCartItems((prev) =>
                prev.map((item) =>
                    item.id === itemId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
            setAlert({
                type: "success",
                message: "Cantidad actualizada",
            });
        } catch (error) {
            console.error("💥 [CART] Error updating quantity:", error);
            setAlert({
                type: "error",
                message: "Error al actualizar cantidad",
            });
        } finally {
            setUpdating(null);
        }
    };

    const removeItem = async (itemId: number) => {
        try {
            setUpdating(itemId);
            console.log("🛒 [CART] Removing item:", itemId);
            await cartService.removeFromCart(itemId);
            setCartItems((prev) => prev.filter((item) => item.id !== itemId));
            setAlert({
                type: "success",
                message: "Producto eliminado del carrito",
            });
        } catch (error) {
            console.error("💥 [CART] Error removing item:", error);
            setAlert({
                type: "error",
                message: "Error al eliminar producto",
            });
        } finally {
            setUpdating(null);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
    };

    if (!user) {
        console.log("❌ [CART] No user, redirecting to login");
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">
                        Debes iniciar sesión para ver tu carrito
                    </p>
                    <Link to="/login" className="mt-4 inline-block">
                        <Button>Iniciar Sesión</Button>
                    </Link>
                </div>
            </div>
        );
    }

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Mi Carrito
                    </h1>
                    <p className="text-gray-600">
                        Revisa y gestiona los productos en tu carrito
                    </p>
                </div>

                {alert && (
                    <div className="mb-6">
                        <Alert
                            type={alert.type}
                            message={alert.message}
                            onClose={() => setAlert(null)}
                        />
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0L4 5M7 13h10M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Tu carrito está vacío
                        </h2>
                        <p className="text-gray-600 mb-8">
                            ¡Agrega algunos productos increíbles a tu carrito!
                        </p>
                        <Link to="/products">
                            <Button
                                size="lg"
                                onClick={() =>
                                    console.log(
                                        "🛒 [CART] Explore products button clicked"
                                    )
                                }
                            >
                                Explorar Productos
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Productos ({cartItems.length}{" "}
                                        {cartItems.length === 1
                                            ? "artículo"
                                            : "artículos"}
                                        )
                                    </h2>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="p-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="w-20 h-20 object-cover rounded-lg"
                                                        src={
                                                            item.product
                                                                .imageUrl ||
                                                            "/placeholder.svg?height=80&width=80"
                                                        }
                                                        alt={item.product.name}
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {item.product.name}
                                                    </h3>
                                                    {item.product
                                                        .description && (
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {
                                                                item.product
                                                                    .description
                                                            }
                                                        </p>
                                                    )}
                                                    <p className="text-lg font-semibold text-indigo-600 mt-2">
                                                        $
                                                        {item.product.price.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center border border-gray-300 rounded-md">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.quantity -
                                                                        1
                                                                )
                                                            }
                                                            disabled={
                                                                updating ===
                                                                    item.id ||
                                                                item.quantity <=
                                                                    1
                                                            }
                                                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
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
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M20 12H4"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <span className="px-4 py-2 text-gray-900 font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.quantity +
                                                                        1
                                                                )
                                                            }
                                                            disabled={
                                                                updating ===
                                                                    item.id ||
                                                                item.quantity >=
                                                                    item.product
                                                                        .stock
                                                            }
                                                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
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
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            removeItem(item.id)
                                                        }
                                                        disabled={
                                                            updating === item.id
                                                        }
                                                        className="p-2 text-red-400 hover:text-red-600 disabled:opacity-50"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {item.quantity >=
                                                item.product.stock && (
                                                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                                                    <p className="text-sm text-yellow-800">
                                                        Stock limitado: Solo
                                                        quedan{" "}
                                                        {item.product.stock}{" "}
                                                        unidades disponibles
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Resumen del Pedido
                                </h2>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            Subtotal
                                        </span>
                                        <span className="text-gray-900">
                                            ${calculateTotal().toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            Envío
                                        </span>
                                        <span className="text-gray-900">
                                            Gratis
                                        </span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span className="text-gray-900">
                                                Total
                                            </span>
                                            <span className="text-indigo-600">
                                                ${calculateTotal().toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <Button
                                        className="w-full"
                                        size="lg"
                                        disabled
                                    >
                                        Proceder al Pago
                                        <span className="text-xs block mt-1">
                                            (Próximamente)
                                        </span>
                                    </Button>
                                    <Link to="/products" className="block">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Continuar Comprando
                                        </Button>
                                    </Link>
                                </div>

                                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                                    <div className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-green-400 mt-0.5 mr-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <div>
                                            <h4 className="text-sm font-medium text-green-900">
                                                Envío Gratis
                                            </h4>
                                            <p className="text-sm text-green-700 mt-1">
                                                Tu pedido califica para envío
                                                gratuito
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
