const fs = require("fs");
const path = require("path");

const filesToCreate = [
  {
    path: "src/pages/Home.jsx",
    content: `import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Bienvenue sur l’application touristique 🌍</h1>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '40px' }}>
        Créez, enregistrez et visualisez vos circuits touristiques personnalisés.
      </p>
      <button
        onClick={() => navigate('/map')}
        style={{
          padding: '15px 30px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Commencer
      </button>
    </div>
  );
};

export default Home;
`
  },
  {
    path: "src/pages/MapPage.jsx",
    content: `import React from 'react';
import CarteGoogle from '../CarteGoogle';

const MapPage = () => {
  return <CarteGoogle />;
};

export default MapPage;
`
  },
  {
    path: "src/components/Navbar.jsx",
    content: `import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#2196F3', padding: '10px 20px', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🌍 Tourisme</Link>
        </h2>
        <div>
          <Link to="/" style={{ marginRight: '20px', color: 'white', textDecoration: 'none' }}>Accueil</Link>
          <Link to="/map" style={{ color: 'white', textDecoration: 'none' }}>Carte</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
`
  }
];

// Création des fichiers
filesToCreate.forEach(({ path: filePath, content }) => {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Dossier créé : ${dir}`);
  }

  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content, "utf8");
    console.log(`✅ Fichier créé : ${filePath}`);
  } else {
    console.log(`✔️ Fichier déjà existant : ${filePath}`);
  }
});
