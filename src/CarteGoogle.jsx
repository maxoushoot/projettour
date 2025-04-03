// ✅ src/CarteGoogle.jsx
import React, { useState, useEffect } from "react";
import FloatingMenu from "./components/FloatingMenu";
import SaveCircuitModal from "./components/SaveCircuitModal";
import CircuitsListModal from "./components/CircuitsListModal";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 140px)",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
};

const center = {
  lat: 45.75,
  lng: 6.12,
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const CarteGoogle = () => {
  const getIconFromType = (type) => {
    switch (type) {
      case "restaurant": return "🍽️";
      case "hotel": return "🛏️";
      case "nature": return "🌲";
      case "culture": return "🏛️";
      case "activity": return "🎯";
      default: return "📍";
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const isMobile = useIsMobile();
  const [steps, setSteps] = useState([]);
  const [tempLatLng, setTempLatLng] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", type: "restaurant" });
  const [directions, setDirections] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [circuitName, setCircuitName] = useState("");
  const [savedCircuits, setSavedCircuits] = useState(
    JSON.parse(localStorage.getItem("circuits") || "{}")
  );
  const [showCircuitsMenu, setShowCircuitsMenu] = useState(false);

  const handleMapClick = (e) => {
    setTempLatLng({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setFormData({ title: "", description: "", type: "restaurant" });
  };

  const handleSubmit = () => {
    if (!formData.title) return;
    setSteps([...steps, { ...tempLatLng, ...formData }]);
    setTempLatLng(null);
    setFormData({ title: "", description: "", type: "restaurant" });
  };

  const handleCancel = () => {
    setTempLatLng(null);
    setFormData({ title: "", description: "", type: "restaurant" });
  };

  const calculateRoute = () => {
    if (steps.length < 2) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: steps[0],
        destination: steps[steps.length - 1],
        waypoints: steps.slice(1, -1).map((s) => ({ location: s })),
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        }
      }
    );
  };

  const trackUserPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          setUserPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  };

  const saveCircuit = (name) => {
    if (!name || steps.length === 0) return;
    const updated = { ...savedCircuits, [name]: steps };
    localStorage.setItem("circuits", JSON.stringify(updated));
    setSavedCircuits(updated);
    setCircuitName("");
    setShowSavePopup(false);
  };

  const loadCircuit = (name) => {
    const circuit = savedCircuits[name];
    if (circuit) {
      setSteps(circuit);
      setDirections(null);
      setSelectedStep(null);
    }
  };

  return isLoaded ? (
    <div style={{ padding: isMobile ? "20px 10px" : "40px", fontFamily: "Segoe UI, sans-serif" }}>
      <header
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  }}
>
  <span style={{ fontSize: "1.2rem" }}>🌍 Circuit en cours : <strong>{circuitName || "Nouveau circuit"}</strong></span>

  <button
    onClick={() => setShowCircuitsMenu(true)}
    style={{
      backgroundColor: "#2196F3",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    📁 Mes circuits
  </button>
</header>


      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onClick={handleMapClick}
        >
          {steps.map((s, i) => (
            <Marker
              key={i}
              position={s}
              label={{
                text: getIconFromType(s.type),
                fontSize: "18px"
              }}
              onClick={() => setSelectedStep(i)}
            />
          ))}

          {selectedStep !== null && steps[selectedStep] && (
            <InfoWindow
              position={steps[selectedStep]}
              onCloseClick={() => setSelectedStep(null)}
            >
              <div>
                <h4>{steps[selectedStep].title}</h4>
                <p style={{ maxWidth: "200px" }}>{steps[selectedStep].description}</p>
              </div>
            </InfoWindow>
          )}

          {userPosition && (
            <Marker
              position={userPosition}
              icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
            />
          )}

          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>

        {tempLatLng && (
          <div style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            background: "#fff",
            borderTop: "2px solid #ddd",
            boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
            zIndex: 1000,
            padding: "30px 20px",
            display: "flex",
            justifyContent: "center"
          }}>
            <div style={{
              width: "100%",
              maxWidth: "600px",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}>
              <h3 style={{ margin: 0, fontSize: "1.2rem" }}>📝 Nouvelle étape</h3>

              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                {["🍽️", "🛏️", "🌲", "🏛️", "🎯"].map((icon, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFormData({ ...formData, type: ["restaurant", "hotel", "nature", "culture", "activity"][idx] })}
                    style={{
                      flex: "1 1 18%",
                      fontSize: "1.5rem",
                      padding: "10px",
                      borderRadius: "8px",
                      border: formData.type === ["restaurant", "hotel", "nature", "culture", "activity"][idx] ? "2px solid #4CAF50" : "1px solid #ccc",
                      backgroundColor: "#f9f9f9",
                      cursor: "pointer",
                      textAlign: "center"
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Nom de l'étape"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={inputStyle}
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={textareaStyle}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleSubmit} style={buttonStylePrimary}>Ajouter</button>
                <button onClick={handleCancel} style={buttonStyleSecondary}>Annuler</button>
              </div>
            </div>
          </div>
        )}

        <FloatingMenu
          onTrace={calculateRoute}
          onSave={() => setShowSavePopup(true)}
          onOpenCircuits={() => setShowCircuitsMenu(true)}
        />
{showCircuitsMenu && (
  <CircuitsListModal
    circuits={savedCircuits}
    onLoad={loadCircuit}
    onDelete={(name) => {
      const updated = { ...savedCircuits };
      delete updated[name];
      setSavedCircuits(updated);
      localStorage.setItem("circuits", JSON.stringify(updated));
    }}
    onClose={() => setShowCircuitsMenu(false)}
  />
)}

        {showSavePopup && (
          <SaveCircuitModal
            existingNames={Object.keys(savedCircuits)}
            onSave={saveCircuit}
            onClose={() => setShowSavePopup(false)}
          />
        )}
      </div>
    </div>
  ) : (
    <p>Chargement de la carte…</p>
  );
};

const buttonStylePrimary = {
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "10px 16px",
  fontSize: "1rem",
  cursor: "pointer"
};

const buttonStyleSecondary = {
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "10px 16px",
  fontSize: "1rem",
  cursor: "pointer"
};

const buttonStyleTertiary = {
  backgroundColor: "#2196F3",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "10px 16px",
  fontSize: "1rem",
  cursor: "pointer"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  minHeight: "60px"
};

export default CarteGoogle;
