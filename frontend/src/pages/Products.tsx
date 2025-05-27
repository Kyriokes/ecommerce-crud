"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { cartService } from "../services/cartService";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Alert } from "../components/ui/Alert";
import { apiClient } from "../utils/api";
import type { Product } from "../types";

export const Products: React.FC = () => {
    const { isAuthenticated, user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [alert, setAlert] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    console.log("🛍️ [PRODUCTS] Rendering with auth state:", {
        isAuthenticated,
        hasUser: !!user,
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            console.log("🛍️ [PRODUCTS] Loading products from API...");

            // Try to load from API first
            try {
                const apiProducts = await apiClient.get<Product[]>(
                    "/api/products"
                );
                console.log(
                    "✅ [PRODUCTS] Products loaded from API:",
                    apiProducts.length
                );
                setProducts(apiProducts);
            } catch (error) {
                console.warn(
                    "⚠️ [PRODUCTS] API failed, using mock data:",
                    error
                );

                // Fallback to mock data with IDs that should exist in backend
                const mockProducts: Product[] = [
                    {
                        id: 10, // Changed from 1 to avoid conflicts
                        name: "Smartphone Premium",
                        description:
                            "Último modelo con cámara de alta resolución y batería de larga duración",
                        price: 899.99,
                        stock: 15,
                        imageUrl: "/placeholder.svg?height=300&width=300",
                        category: "Electrónicos",
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    {
                        id: 11, // Changed from 2
                        name: "Laptop Gaming",
                        description:
                            "Potente laptop para gaming con tarjeta gráfica dedicada",
                        price: 1299.99,
                        stock: 8,
                        imageUrl: "/placeholder.svg?height=300&width=300",
                        category: "Electrónicos",
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    {
                        id: 12, // Changed from 3
                        name: "Auriculares Inalámbricos",
                        description:
                            "Auriculares con cancelación de ruido y sonido de alta calidad",
                        price: 199.99,
                        stock: 25,
                        imageUrl: "/placeholder.svg?height=300&width=300",
                        category: "Audio",
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    {
                        id: 13, // Changed from 4
                        name: "Camiseta Deportiva",
                        description:
                            "Camiseta transpirable perfecta para ejercicio y actividades deportivas",
                        price: 29.99,
                        stock: 50,
                        imageUrl: "/placeholder.svg?height=300&width=300",
                        category: "Ropa",
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    {
                        id: 14, // Changed from 5
                        name: "Reloj Inteligente",
                        description:
                            "Reloj con monitoreo de salud y notificaciones inteligentes",
                        price: 249.99,
                        stock: 12,
                        imageUrl: "/placeholder.svg?height=300&width=300",
                        category: "Electrónicos",
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    {
                        id: 15, // Changed from 6
                        name: "Mochila de Viaje",
                        description:
                            "Mochila resistente con múltiples compartimentos para viajes",
                        price: 79.99,
                        stock: 20,
                        imageUrl: "/placeholder.svg?height=300&width=300",
                        category: "Accesorios",
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                ];
                setProducts(mockProducts);
                console.log(
                    "✅ [PRODUCTS] Mock products loaded:",
                    mockProducts.length
                );
            }
        } catch (error) {
            console.error("💥 [PRODUCTS] Error loading products:", error);
            setAlert({
                type: "error",
                message: "Error al cargar productos",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId: number) => {
        console.log(
            "🛒 [PRODUCTS] Add to cart clicked for product:",
            productId
        );
        console.log("🛒 [PRODUCTS] Auth state:", {
            isAuthenticated,
            hasUser: !!user,
        });

        if (!isAuthenticated || !user) {
            console.log("❌ [PRODUCTS] Not authenticated, showing error");
            setAlert({
                type: "error",
                message:
                    "Debes iniciar sesión para agregar productos al carrito",
            });
            return;
        }

        try {
            console.log("🛒 [PRODUCTS] Adding product to cart...");
            await cartService.addToCart({ productId, quantity: 1 });
            console.log("✅ [PRODUCTS] Product added to cart successfully");
            setAlert({
                type: "success",
                message: "Producto agregado al carrito",
            });
        } catch (error) {
            console.error("💥 [PRODUCTS] Error adding to cart:", error);
            setAlert({
                type: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "Error al agregar producto al carrito",
            });
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesCategory =
            !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory && product.isActive;
    });

    const categories = Array.from(
        new Set(products.map((product) => product.category).filter(Boolean))
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando productos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Productos
                    </h1>
                    <p className="text-gray-600">
                        Descubre nuestra increíble selección de productos
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

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Buscar productos"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar por nombre o descripción..."
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categoría
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Todas las categorías</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
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
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            No se encontraron productos
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Intenta ajustar tus filtros de búsqueda
                        </p>
                        <Button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("");
                            }}
                        >
                            Limpiar Filtros
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={() => handleAddToCart(product.id)}
                                isAuthenticated={isAuthenticated}
                            />
                        ))}
                    </div>
                )}

                {/* Load More Button (for future pagination) */}
                {filteredProducts.length > 0 && (
                    <div className="mt-12 text-center">
                        <Button variant="outline" disabled>
                            Cargar Más Productos
                            <span className="text-xs block mt-1">
                                (Próximamente)
                            </span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
