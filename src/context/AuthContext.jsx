// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // local users (demo only, normally API thi aavse)
    const [users, setUsers] = useState(() => {
        const storedUsers = localStorage.getItem("users");
        return storedUsers
            ? JSON.parse(storedUsers)
            : [{ username: "admin", phone: "9999999999", password: "1234" }];
    });

    // Restore login session on page refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Save users in localStorage whenever updated
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    // LOGIN function
    const login = (username, password, onSuccess) => {
        const existingUser = users.find(
            (u) => u.username === username && u.password === password
        );
        if (existingUser) {
            setIsAuthenticated(true);
            setUser(existingUser);
            localStorage.setItem("user", JSON.stringify(existingUser));
            if (onSuccess) onSuccess();
        } else {
            alert("Invalid credentials");
        }
    };

    // REGISTER function
    const register = (username, phone, password, cpassword, onRedirect) => {
        if (password !== cpassword) {
            alert("Passwords do not match");
            return;
        }
        const exists = users.find((u) => u.username === username);
        if (exists) {
            alert("Username already exists");
            return;
        }
        const newUser = { username, phone, password };
        setUsers([...users, newUser]);

        alert("Registration successful! Please login.");
        if (onRedirect) onRedirect();
    };

    // LOGOUT function
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("user");
        window.location.reload()
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, login, logout, register }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
