import { Link } from "react-router-dom";
import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">The Read Shop</div>
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">Login</a>
        <a href="#">About</a>
      </nav>
    </header>
  );
}

export default Header;