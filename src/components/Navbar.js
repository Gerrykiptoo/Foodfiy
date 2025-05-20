import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Foodiy</Link>
      <div>
        <Link className="nav-link" to="/products">Menu</Link>
        <Link className="nav-link" to="/cart">Cart</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
