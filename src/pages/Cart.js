import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Simulate loading from server or database
    const timer = setTimeout(() => {
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(storedCart);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = (index, amount) => {
    const newCart = [...cartItems];
    newCart[index].quantity += amount;
    
    if (newCart[index].quantity === 0) {
      newCart.splice(index, 1);
    }
    
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true);
      setDiscount(10);
    } else if (promoCode.toLowerCase() === "foodify20") {
      setPromoApplied(true);
      setDiscount(20);
    } else {
      alert("Invalid promo code");
    }
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price.substring(1)) * item.quantity;
  }, 0);

  // Calculate delivery fee
  const deliveryFee = subtotal > 30 ? 0 : 4.99;

  // Calculate discount amount
  const discountAmount = (subtotal * discount) / 100;

  // Calculate total
  const total = subtotal + deliveryFee - discountAmount;

  return (
    <main className="cart-page">
      <div className="container py-5">
        <h1 className="section-title">Your Cart</h1>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="loader"></div>
            <p className="mt-3">Loading your cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn btn-primary mt-3">
              <i className="fas fa-utensils me-2"></i> Browse Menu
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-items-container">
                <div className="cart-header">
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Product</h5>
                    </div>
                    <div className="col-md-2 text-center">
                      <h5>Price</h5>
                    </div>
                    <div className="col-md-2 text-center">
                      <h5>Quantity</h5>
                    </div>
                    <div className="col-md-2 text-center">
                      <h5>Total</h5>
                    </div>
                  </div>
                </div>
                
                <div className="cart-items">
                  {cartItems.map((item, index) => {
                    const itemTotal = parseFloat(item.price.substring(1)) * item.quantity;
                    
                    return (
                      <div key={index} className="cart-item">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center">
                              <div className="cart-item-image">
                                <img src={item.image} alt={item.name} />
                              </div>
                              <div className="cart-item-details">
                                <h5 className="cart-item-title">{item.name}</h5>
                                {item.category && (
                                  <span className="cart-item-category">{item.category}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-md-2 text-center">
                            <span className="cart-item-price">{item.price}</span>
                          </div>
                          
                          <div className="col-md-2 text-center">
                            <div className="quantity-control">
                              <button 
                                className="quantity-btn" 
                                onClick={() => updateQuantity(index, -1)}
                                disabled={item.quantity <= 1}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <span className="quantity">{item.quantity}</span>
                              <button 
                                className="quantity-btn" 
                                onClick={() => updateQuantity(index, 1)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          
                          <div className="col-md-2 text-center">
                            <span className="cart-item-total">${itemTotal.toFixed(2)}</span>
                            <button 
                              className="remove-btn" 
                              onClick={() => removeItem(index)}
                              aria-label="Remove item"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="cart-actions">
                  <Link to="/products" className="btn btn-outline-primary">
                    <i className="fas fa-arrow-left me-2"></i> Continue Shopping
                  </Link>
                  <button className="btn btn-outline-danger" onClick={clearCart}>
                    <i className="fas fa-trash me-2"></i> Clear Cart
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="cart-summary">
                <h4 className="summary-title">Order Summary</h4>
                
                <div className="summary-item">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="summary-item">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                
                {promoApplied && (
                  <div className="summary-item discount">
                    <span>Discount ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="summary-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                {!promoApplied && (
                  <div className="promo-code">
                    <h5>Promo Code</h5>
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button 
                        className="btn btn-outline-primary ms-2" 
                        onClick={applyPromoCode}
                      >
                        Apply
                      </button>
                    </div>
                    <small className="text-muted">Try "WELCOME10" for 10% off</small>
                  </div>
                )}
                
                <button className="btn btn-primary checkout-btn">
                  <i className="fas fa-lock me-2"></i> Proceed to Checkout
                </button>
                
                <div className="payment-methods">
                  <p>We Accept:</p>
                  <div className="payment-icons">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-cc-amex"></i>
                    <i className="fab fa-cc-paypal"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
