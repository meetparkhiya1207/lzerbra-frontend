import { useMediaQuery, useTheme } from "@mui/material";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoginModal from "./auth/Login";
import { AuthProvider } from "./context/AuthContext";
import RegisterModal from "./auth/Register";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ProductDetailsComponents from "./components/ProductDetailsPage";
import Shop from "./components/Shop";
import Header from "./comman/Header";
import Footer from "./comman/Footer";
import CartPageSimple from "./comman/CartPage";
import ScrollToTop from "./comman/ScrollToTop";
import CheckoutPageSimple from "./comman/CheckoutPageSimple";
import OrdersPageSimple from "./comman/OrdersPageSimple";
import { CartDrawer } from "./comman/CartDrawer";
import Signup from "./comman/Signup";
import Login from "./comman/Login";

// 👉 Main layout (with header/footer)
function Layout() {
  return (
    <>
      <CartDrawer />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

// 👉 Blank layout (without header/footer)
function BlankLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default function App() {
  const [loginOpen, setLoginOpen] = useState(true);
  const [registerOpen, setRegisterOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width:600px)');

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
        <ScrollToTop />
        <Routes>
          {/* ✅ Routes with Header + Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product-details/:id" element={<ProductDetailsComponents />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<CartPageSimple />} />
            <Route path="/checkout" element={<CheckoutPageSimple />} />
            <Route path="/orders" element={<OrdersPageSimple />} />
          </Route>

          <Route element={<BlankLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
        <ToastContainer
          position={isMobile ? "bottom-center" : "top-right"}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
