import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SellerRegistrationPage from "@/components/pages/SellerRegistrationPage";
import SellerDashboardPage from "@/components/pages/SellerDashboardPage";
import React from "react";
import HomePage from "@/components/pages/HomePage";
import CheckoutPage from "@/components/pages/CheckoutPage";
import BrowsePage from "@/components/pages/BrowsePage";
import CartPage from "@/components/pages/CartPage";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/seller/register" element={<SellerRegistrationPage />} />
            <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </BrowserRouter>
  );
}

export default App;