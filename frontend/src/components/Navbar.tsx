import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC<{ user: string | null; onLogout: () => void }> = ({
    user,
    onLogout,
}) => {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Mi E-Commerce</h1>
                <div>
                    <Link
                        to="/"
                        className="px-4 py-2 bg-blue-800 rounded hover:bg-blue-700"
                    >
                        Inicio
                    </Link>
                    <Link
                        to="/products"
                        className="px-4 py-2 ml-4 bg-blue-800 rounded hover:bg-blue-700"
                    >
                        Productos
                    </Link>
                    <Link
                        to="/cart"
                        className="px-4 py-2 ml-4 bg-blue-800 rounded hover:bg-blue-700"
                    >
                        Carrito
                    </Link>
                    {user ? (
                        <div className="ml-4 flex items-center">
                            <span className="mr-2">Hola, {user}</span>
                            <button
                                className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
                                onClick={onLogout}
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    ) : (
                        // Si no está logeado, mostramos los botones de login y register
                        <div className="ml-4">
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-blue-800 rounded hover:bg-blue-700"
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 ml-4 bg-blue-800 rounded hover:bg-blue-700"
                            >
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
