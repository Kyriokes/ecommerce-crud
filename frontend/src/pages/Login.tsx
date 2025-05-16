import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllusers } from "../services/userService";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const users = await getAllusers();
        const user = users.find(
            (u: { username: string; password: string }) =>
                u.username === username && u.password === password
        );

        if (user) {
            localStorage.setItem("userId", user.id);
            navigate("/");
        } else {
            alert("Credenciales incorrectas");
        }
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Iniciar Sesión
                </h2>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    className="border p-2 w-full mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="border p-2 w-full mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700"
                    onClick={handleLogin}
                >
                    Iniciar sesión
                </button>
                <button
                    className="bg-gray-600 text-white p-2 w-full rounded mt-4 hover:bg-gray-700"
                    onClick={handleRegister}
                >
                    Registrarse
                </button>
            </div>
        </div>
    );
};

export default Login;
