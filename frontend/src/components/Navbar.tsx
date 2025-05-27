"use client";

import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { UserMenu } from "./UserMenu";
import { Button } from "./ui/Button";

export const Navbar: React.FC = () => {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

    console.log("🧭 [NAVBAR] Rendering with auth state:", {
        isAuthenticated,
        loading,
        hasUser: !!user,
        pathname: location.pathname,
    });

    const isActive = (path: string) => location.pathname === path;

    const navLinkClass = (path: string) => `
    px-3 py-2 rounded-md text-sm font-medium transition-colors
    ${
        isActive(path)
            ? "bg-indigo-700 text-white"
            : "text-indigo-100 hover:bg-indigo-600 hover:text-white"
    }
  `;

    return (
        <nav className="bg-indigo-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <h1 className="text-xl font-bold text-white">
                                🛍️ EcoShop
                            </h1>
                        </Link>

                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                <Link to="/" className={navLinkClass("/")}>
                                    Inicio
                                </Link>
                                <Link
                                    to="/products"
                                    className={navLinkClass("/products")}
                                >
                                    Productos
                                </Link>
                                {isAuthenticated && (
                                    <Link
                                        to="/cart"
                                        className={navLinkClass("/cart")}
                                    >
                                        Carrito
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {loading ? (
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                <span className="text-white text-sm">
                                    Cargando...
                                </span>
                            </div>
                        ) : isAuthenticated && user ? (
                            <UserMenu />
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/login">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-indigo-600 bg-white border-white hover:text-white hover:bg-indigo-600"
                                    >
                                        Iniciar sesión
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-indigo-600 bg-white border-white hover:text-white hover:bg-indigo-600"
                                    >
                                        Registrarse
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
