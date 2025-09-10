// src/App.jsx
import { useTheme } from "@mui/material";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginModal from "./auth/Login";
import { AuthProvider } from "./context/AuthContext";
import RegisterModal from "./auth/Register";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ProductDetailsPage from "./components/ProductDetails";
import ProductDetailsComponents from "./components/ProductDetailsPage";

export default function App() {
const [loginOpen, setLoginOpen] = useState(true);
  const [registerOpen, setRegisterOpen] = useState(false);

  const switchToRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const switchToLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const theme = useTheme();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-details" element={<ProductDetailsComponents />} />
        </Routes>
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSwitch={switchToRegister} />
        <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} onSwitch={switchToLogin} />
          <ToastContainer/>
      </BrowserRouter>
    </AuthProvider>
  );
}
