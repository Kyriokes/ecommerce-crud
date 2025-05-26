"use client";

import type React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";

export const Admin: React.FC = () => {
    const { user } = useAuth();

    if (!user?.isAdmin) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <svg
                        className="w-16 h-16 text-red-400 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Acceso Denegado
                    </h2>
                    <p className="text-gray-600">
                        No tienes permisos de administrador para acceder a esta
                        página.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Panel de Administración
                    </h1>
                    <p className="text-gray-600">
                        Gestiona tu tienda y usuarios
                    </p>
                </div>

                {/* Admin Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
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
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Usuarios
                                </h3>
                                <p className="text-gray-600">
                                    Gestionar usuarios registrados
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-green-600"
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
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Productos
                                </h3>
                                <p className="text-gray-600">
                                    Gestionar catálogo de productos
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-yellow-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Órdenes
                                </h3>
                                <p className="text-gray-600">
                                    Gestionar pedidos y ventas
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Features */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Funciones de Administrador
                        </h2>
                        <p className="text-gray-600">
                            Herramientas avanzadas para gestionar tu tienda
                        </p>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* User Management */}
                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
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
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Gestión de Usuarios
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Ver, editar y gestionar cuentas de usuarios
                                    registrados.
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    disabled
                                >
                                    Próximamente
                                </Button>
                            </div>

                            {/* Product Management */}
                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-green-600"
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
                                    Gestión de Productos
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Crear, editar y gestionar el catálogo de
                                    productos.
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    disabled
                                >
                                    Próximamente
                                </Button>
                            </div>

                            {/* Order Management */}
                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-yellow-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Gestión de Órdenes
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Procesar pedidos, gestionar envíos y
                                    devoluciones.
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    disabled
                                >
                                    Próximamente
                                </Button>
                            </div>

                            {/* Analytics */}
                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-purple-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Analíticas
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Ver estadísticas de ventas, usuarios y
                                    rendimiento.
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    disabled
                                >
                                    Próximamente
                                </Button>
                            </div>

                            {/* Settings */}
                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Configuración
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Configurar ajustes generales de la tienda.
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    disabled
                                >
                                    Próximamente
                                </Button>
                            </div>

                            {/* Reports */}
                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-red-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Reportes
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Generar reportes detallados de ventas y
                                    actividad.
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    disabled
                                >
                                    Próximamente
                                </Button>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-blue-400 mt-0.5 mr-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <div>
                                    <h4 className="text-sm font-medium text-blue-900">
                                        Funciones en Desarrollo
                                    </h4>
                                    <p className="text-sm text-blue-700 mt-1">
                                        Estas funciones están siendo
                                        desarrolladas y estarán disponibles en
                                        futuras actualizaciones. Mantente atento
                                        a las novedades.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
