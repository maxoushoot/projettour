// ✅ src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        backgroundColor: "#4A90E2",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo + titre */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
          alt="logo"
          style={{ height: "28px" }}
        />
        <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Tourisme</span>
      </div>

      {/* Liens desktop */}
      <div className="nav-links" style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/"
          style={{
            color: isActive("/") ? "#FFD700" : "white",
            fontWeight: isActive("/") ? "bold" : "normal",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
        >
          Accueil
        </Link>
        <Link
          to="/map"
          style={{
            color: isActive("/map") ? "#FFD700" : "white",
            fontWeight: isActive("/map") ? "bold" : "normal",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
        >
          Carte
        </Link>
      </div>

      {/* Menu mobile */}
      <div className="mobile-menu" style={{ display: "none" }}>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "transparent", border: "none", color: "white" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {mobileOpen && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "10px",
              background: "white",
              color: "#333",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "10px",
              zIndex: 1001,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              minWidth: "120px"
            }}
          >
            <Link to="/" onClick={() => setMobileOpen(false)}>Accueil</Link>
            <Link to="/map" onClick={() => setMobileOpen(false)}>Carte</Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
