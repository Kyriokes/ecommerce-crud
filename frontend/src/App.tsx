import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App: React.FC = () => {
    const [user, setUser] = useState<string | null>(null);

    useEffect(()=>{
        const loggedUser = localStorage.getItem("userId");
        if (loggedUser){
            setUser(loggedUser)
        }
    },[]);

    return (
        <Router>
            <Navbar />
            <div className="bg-gray-100 min-h-screen">
                <Routes>
                    <Route
                        path="/"
                        element={user ? <Home /> : <Navigate to="/login" />}
                    />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
