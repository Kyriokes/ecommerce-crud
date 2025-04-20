import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
