import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';  // CSS global ou de base
import Navbar from './navbar/navbar.js';
import HomePage from './HomePage/HomePage.js';
import Login from './login/login.js';
import Inscription from './inscription/inscription.js';  // Importation de la page d'inscription
import TrajetsPrice from './TrajetsPrice/TrajetsPrice.js'

function App() {
  const location = useLocation();

  useEffect(() => {
    // Appliquer les styles spécifiques à la page active
    if (location.pathname === '/') {
      document.body.classList.add('body__homePage');
      document.body.classList.remove('body__otherPage');
    } else if (location.pathname === '/login') {
      document.body.classList.add('body__otherPage');
      document.body.classList.remove('body__homePage');
    } else if (location.pathname === '/inscription') {
      document.body.classList.add('body__otherPage');
      document.body.classList.remove('body__homePage');
    } else if (location.pathname === '/TrajetsPrice') {
      document.body.classList.add('body__otherPage');
      document.body.classList.remove('body__homePage');
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/TrajetsPrice" element={<TrajetsPrice />} />
      </Routes>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
