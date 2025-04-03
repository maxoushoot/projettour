// ✅ src/components/CircuitsListModal.jsx
import React from "react";

const CircuitsListModal = ({ circuits, onLoad, onDelete, onClose }) => {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <header style={modalHeaderStyle}>
          <h3 style={{ margin: 0 }}>📁 Mes circuits enregistrés</h3>
          <button onClick={onClose} style={closeButtonStyle}>✖</button>
        </header>

        {Object.keys(circuits).length === 0 ? (
          <p style={{ fontSize: "1rem", color: "#777", padding: "10px 0" }}>
            Aucun circuit sauvegardé.
          </p>
        ) : (
          <ul style={listStyle}>
            {Object.entries(circuits).map(([name, steps]) => (
              <li key={name} style={itemStyle}>
                <span style={{ fontWeight: "bold" }}>{name}</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => onLoad(name)} style={buttonStylePrimary}>Charger</button>
                  <button onClick={() => onDelete(name)} style={buttonStyleDanger}>Supprimer</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  maxWidth: "500px",
  width: "90%",
};

const modalHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
};

const closeButtonStyle = {
  background: "transparent",
  border: "none",
  fontSize: "1.2rem",
  cursor: "pointer",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};

const buttonStylePrimary = {
  backgroundColor: "#2196F3",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "8px 12px",
  cursor: "pointer",
};

const buttonStyleDanger = {
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "8px 12px",
  cursor: "pointer",
};

export default CircuitsListModal;
