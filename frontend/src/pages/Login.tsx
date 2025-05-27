"use client";

import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Alert } from "../components/ui/Alert";

export const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.username.trim()) {
            newErrors.username = "El nombre de usuario es requerido";
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es requerida";
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
            const result = await login(formData.username, formData.password);

            if (result.success) {
                setAlert({
                    type: "success",
                    message: "Inicio de sesión exitoso",
                });
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                setAlert({
                    type: "error",
                    message: result.error || "Error al iniciar sesión",
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

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Iniciar Sesión
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        ¿No tienes una cuenta?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Regístrate aquí
                        </Link>
                    </p>
                </div>

                <div className="bg-white py-8 px-6 shadow rounded-lg">
                    {alert && (
                        <div className="mb-6">
                            <Alert
                                type={alert.type}
                                message={alert.message}
                                onClose={() => setAlert(null)}
                            />
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Nombre de usuario"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            error={errors.username}
                            required
                            autoComplete="username"
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            required
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            loading={loading}
                        >
                            Iniciar Sesión
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
