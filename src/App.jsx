import { useTheme } from "@mui/material";
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

function Layout() {
  return (
    <>
      <Header />
       <CartDrawer />
      <Outlet />
      <Footer />
    </>
  );
}

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
       <ScrollToTop /> 
        <Routes>
          {/* Layout wrapper */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product-details/:id" element={<ProductDetailsComponents />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<CartPageSimple />} />
            <Route path="/checkout" element={<CheckoutPageSimple />} />
            <Route path="/orders" element={<OrdersPageSimple />} />
          </Route>
        </Routes>

        {/* Auth Modals */}
        <LoginModal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onSwitch={switchToRegister}
        />
        <RegisterModal
          open={registerOpen}
          onClose={() => setRegisterOpen(false)}
          onSwitch={switchToLogin}
        />

        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}
