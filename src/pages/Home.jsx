import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Home = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '90vh',
        padding: '2rem',
        fontFamily: 'Segoe UI, sans-serif',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍 Bienvenue</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', color: '#555' }}>
          Explorez, créez et partagez vos circuits touristiques. Cette application vous permet de construire des itinéraires personnalisés étape par étape !
        </p>
        <button
          onClick={() => navigate('/map')}
          style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Commencer
        </button>
      </div>
    </PageWrapper>
  );
};

export default Home;
