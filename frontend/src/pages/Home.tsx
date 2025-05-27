"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

export const Home: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Bienvenido a{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            EcoShop
                        </span>
                    </h1>

                    {user && (
                        <p className="text-xl text-gray-600 mb-8">
                            ¡Hola {user.username || user.email}! 👋
                        </p>
                    )}

                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                        Descubre productos increíbles con la mejor calidad y
                        precios competitivos. Tu experiencia de compra perfecta
                        te está esperando.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/products">
                            <Button size="lg" className="w-full sm:w-auto">
                                Explorar Productos
                            </Button>
                        </Link>
                        {user && (
                            <Link to="/cart">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-auto"
                                >
                                    Ver Carrito
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-6 h-6 text-indigo-600"
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
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Calidad Garantizada
                        </h3>
                        <p className="text-gray-600">
                            Todos nuestros productos pasan por rigurosos
                            controles de calidad.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-6 h-6 text-indigo-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Mejores Precios
                        </h3>
                        <p className="text-gray-600">
                            Precios competitivos y ofertas especiales para
                            nuestros clientes.
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-6 h-6 text-indigo-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Envío Rápido
                        </h3>
                        <p className="text-gray-600">
                            Entrega rápida y segura directamente a tu puerta.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            {!user && (
                <div className="bg-indigo-600 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            ¿Listo para comenzar?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8">
                            Únete a miles de clientes satisfechos y comienza tu
                            experiencia de compra.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-indigo-600 bg-white border-white hover:text-white hover:bg-indigo-600"
                                >
                                    Crear Cuenta
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-indigo-600 bg-white border-white hover:text-white hover:bg-indigo-600"
                                >
                                    Iniciar Sesión
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
