import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ cartCount }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span className="brand-text">Foodify</span>
            <i className="fas fa-utensils ms-2"></i>
          </Link>
          
          <button 
            className={`navbar-toggler ${isMobileMenuOpen ? '' : 'collapsed'}`} 
            type="button" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-controls="navbarNav" 
            aria-expanded={isMobileMenuOpen ? 'true' : 'false'} 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                  <i className="fas fa-home me-1 d-none d-sm-inline"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`} to="/products">
                  <i className="fas fa-utensils me-1 d-none d-sm-inline"></i> Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`} to="/cart">
                  <i className="fas fa-shopping-cart me-1"></i> Cart
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">
                  <i className="fas fa-envelope me-1 d-none d-sm-inline"></i> Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
