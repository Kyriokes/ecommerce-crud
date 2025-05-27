"use client";

import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Alert } from "../components/ui/Alert";

export const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const { register } = useAuth();
    const navigate = useNavigate();

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

        if (!formData.password) {
            newErrors.password = "La contraseña es requerida";
        } else if (formData.password.length < 6) {
            newErrors.password =
                "La contraseña debe tener al menos 6 caracteres";
        }

        if (formData.password !== formData.confirmPassword) {
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
            const result = await register(
                formData.username,
                formData.email,
                formData.password
            );

            if (result.success) {
                setAlert({
                    type: "success",
                    message: "Registro exitoso. Redirigiendo...",
                });
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                setAlert({
                    type: "error",
                    message: result.error || "Error al registrarse",
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
                        Crear Cuenta
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Inicia sesión aquí
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
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                            autoComplete="email"
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            required
                            autoComplete="new-password"
                        />

                        <Input
                            label="Confirmar contraseña"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            required
                            autoComplete="new-password"
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            loading={loading}
                        >
                            Crear Cuenta
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
