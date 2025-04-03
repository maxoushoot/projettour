// ✅ src/components/SaveCircuitModal.jsx
import React, { useState } from "react";

const SaveCircuitModal = ({ onSave, onClose, existingNames }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Le nom ne peut pas être vide.");
      return;
    }
    if (existingNames.includes(name.trim())) {
      setError("Ce nom est déjà utilisé.");
      return;
    }
    onSave(name.trim());
    setName("");
    setError("");
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={{ marginBottom: "10px" }}>💾 Sauvegarder le circuit</h3>
        <input
          type="text"
          placeholder="Nom du circuit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button onClick={handleSubmit} style={buttonStyleGreen}>Enregistrer</button>
          <button onClick={onClose} style={buttonStyleRed}>Annuler</button>
        </div>
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
  maxWidth: "400px",
  width: "90%",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const buttonStyleGreen = {
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "10px 16px",
  fontSize: "1rem",
  cursor: "pointer",
  flex: 1,
};

const buttonStyleRed = {
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "10px 16px",
  fontSize: "1rem",
  cursor: "pointer",
  flex: 1,
};

export default SaveCircuitModal;
