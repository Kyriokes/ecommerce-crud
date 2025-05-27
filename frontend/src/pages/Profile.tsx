"use client";

import type React from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Alert } from "../components/ui/Alert";
import type { UpdateProfileData } from "../types";

export const Profile: React.FC = () => {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.username.trim()) {
            newErrors.username = "El nombre de usuario es requerido";
        } else if (formData.username.length < 3) {
            newErrors.username =
                "El nombre de usuario debe tener al menos 3 caracteres";
        }

        if (!formData.email.trim()) {
            newErrors.email = "El email es requerido";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Ingresa un email válido";
        }

        if (formData.password && formData.password.length < 6) {
            newErrors.password =
                "La contraseña debe tener al menos 6 caracteres";
        }

        if (
            formData.password &&
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setAlert(null);

        try {
            const updateData: UpdateProfileData = {
                username: formData.username,
                email: formData.email,
            };

            if (formData.password) {
                updateData.password = formData.password;
            }

            const result = await updateProfile(updateData);

            if (result.success) {
                setAlert({
                    type: "success",
                    message: "Perfil actualizado exitosamente",
                });
                setFormData((prev) => ({
                    ...prev,
                    password: "",
                    confirmPassword: "",
                }));
            } else {
                setAlert({
                    type: "error",
                    message: result.error || "Error al actualizar perfil",
                });
            }
        } catch (error) {
            setAlert({
                type: "error",
                message:
                    error instanceof Error ? error.message : "Error inesperado",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">
                        Debes iniciar sesión para ver tu perfil
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Mi Perfil
                        </h1>
                        <p className="text-gray-600">
                            Gestiona tu información personal
                        </p>
                    </div>

                    <div className="p-6">
                        {alert && (
                            <div className="mb-6">
                                <Alert
                                    type={alert.type}
                                    message={alert.message}
                                    onClose={() => setAlert(null)}
                                />
                            </div>
                        )}

                        {/* User Info Card */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">
                                        {user.username.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {user.username}
                                    </h2>
                                    <p className="text-gray-600">
                                        {user.email}
                                    </p>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                            {user.provider}
                                        </span>
                                        {user.isAdmin && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Administrador
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Update Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Nombre de usuario"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    error={errors.username}
                                    required
                                />

                                <Input
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    required
                                />
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Cambiar Contraseña
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Deja estos campos vacíos si no quieres
                                    cambiar tu contraseña
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Nueva contraseña"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                        placeholder="Dejar vacío para mantener actual"
                                    />

                                    <Input
                                        label="Confirmar nueva contraseña"
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        error={errors.confirmPassword}
                                        placeholder="Confirmar nueva contraseña"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setFormData({
                                            username: user.username,
                                            email: user.email,
                                            password: "",
                                            confirmPassword: "",
                                        });
                                        setErrors({});
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" loading={loading}>
                                    Guardar Cambios
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
