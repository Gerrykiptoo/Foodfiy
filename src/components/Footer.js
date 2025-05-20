import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>
            <i className="fas fa-utensils"></i> Foodify
          </h3>
          <p>Delicious food delivered to your doorstep</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Menu</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><i className="fas fa-map-marker-alt"></i>Nairobi Street Food, Nairobi, Kenya</p>
          <p><i className="fas fa-phone"></i> + (254) 703 880 085</p>
          <p><i className="fas fa-envelope"></i> info@foodify.com</p>
        </div>
        
        <div className="footer-section">
          <h3>Download Our App</h3>
          <p>Get our mobile app for a better experience</p>
          <div className="app-buttons">
            <a href="#" className="app-button">
              <i className="fab fa-google-play"></i> Google Play
            </a>
            <a href="#" className="app-button">
              <i className="fab fa-apple"></i> App Store
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Foodify. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
