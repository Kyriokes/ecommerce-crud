import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        const newUser = { username, email, password };
        const createdUser = await createUser(newUser);

        if (createdUser) {
            localStorage.setItem("userId", createdUser.id);
            navigate("/"); // Redirige al home después de registrarse
        } else {
            alert("Error al crear el usuario");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Crear Cuenta
                </h2>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    className="border p-2 w-full mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="border p-2 w-full mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onClick={handleRegister}
                >
                    Registrarse
                </button>
            </div>
        </div>
    );
};

export default Register;
