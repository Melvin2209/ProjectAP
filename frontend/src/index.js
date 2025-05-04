import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Navbar from "./navbar/navbar.js";
import HomePage from "./HomePage/HomePage.js";
import Login from "./login/login.js";
import Inscription from "./inscription/inscription.js";
import TrajetsPrice from "./TrajetsPrice/TrajetsPrice.js";
import MyAccount from "./myAccount/myAccount.js"; // ✅ import de la nouvelle page
import Reservations from "./Reservations/Reservations"; // ← si c’est dans /reservations/
import CreateReservation from './CreateReservation/CreateReservation.js'; // ✅ Import de la nouvelle page
import AdminReservation from './adminReservation/AdminReservation';


function App() {
  const location = useLocation();

  useEffect(() => {
    // ✅ Reset les classes
    document.body.classList.remove('body__homePage', 'body__otherPage');

    // ✅ Appliquer les styles spécifiques à la page active
    if (location.pathname === '/') {
      document.body.classList.add('body__homePage');
    } else {
      document.body.classList.add('body__otherPage');
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
        <Route path="/MyAccount" element={<MyAccount />} /> {/* ✅ nouvelle route */}
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/creer-reservation" element={<CreateReservation />} /> {/* ✅ Nouvelle route */}
        <Route path="/admin-reservations" element={<AdminReservation />} /> {/* ✅ ICI */}
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
