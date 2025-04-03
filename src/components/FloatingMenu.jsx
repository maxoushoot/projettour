// src/components/FloatingMenu.jsx
import React, { useState } from "react";

const FloatingMenu = ({ onTrace, onSave, onOpenCircuits }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Barre de navigation fixe en bas pour mobile */}
      <nav style={navStyle}>
        <button onClick={onTrace} style={navButtonStyle}>🗺️</button>
        <button onClick={onSave} style={navButtonStyle}>💾</button>
        <button onClick={onOpenCircuits} style={navButtonStyle}>📂</button>
      </nav>

      {/* Bouton + flottant */}
      <div style={{ position: "fixed", bottom: "90px", right: "20px", zIndex: 1000 }}>
        <button
          onClick={() => setOpen(!open)}
          style={floatingButtonStyle}
          aria-label="Menu principal"
        >
          {open ? "×" : "+"}
        </button>

        {/* Menu actions */}
        {open && (
          <div style={floatingMenuStyle}>
            <button onClick={onTrace} style={menuButtonStyle}>Tracer l'itinéraire</button>
            <button onClick={onSave} style={menuButtonStyle}>Sauvegarder</button>
            <button onClick={onOpenCircuits} style={menuButtonStyle}>Mes circuits</button>
          </div>
        )}
      </div>
    </>
  );
};

const floatingButtonStyle = {
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "2rem",
  border: "none",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  cursor: "pointer",
  transition: "transform 0.3s ease",
};

const floatingMenuStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "10px",
  backgroundColor: "white",
  padding: "10px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  minWidth: "180px",
  alignItems: "flex-start",
  animation: "fadeIn 0.3s ease-in-out"
};

const menuButtonStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "8px",
  backgroundColor: "#2196F3",
  color: "white",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  transition: "background-color 0.3s ease",
};

const navStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "#fff",
  padding: "10px 0",
  boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
  zIndex: 999
};

const navButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
  transition: "transform 0.2s ease",
};

export default FloatingMenu;