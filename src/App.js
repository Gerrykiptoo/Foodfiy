import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Update cart count whenever localStorage changes
  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const count = cartItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };

    // Initial count
    updateCartCount();

    // Listen for storage events (when localStorage changes)
    window.addEventListener("storage", updateCartCount);
    
    // Custom event for cart updates
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <Header cartCount={cartCount} />
      <main className="page-transition">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      <Footer />
      <button 
        className="theme-toggle" 
        onClick={toggleDarkMode} 
        aria-label="Toggle dark mode"
      >
        <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
      </button>
    </div>
  );
};

export default App;