import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyAccount.scss";

function MyAccount() {
  const navigate = useNavigate();
  const nom = localStorage.getItem("userNom");
  const prenom = localStorage.getItem("userPrenom");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    // Redirection vers login si utilisateur non connecté
    if (!nom || !prenom) {
      navigate("/login");
    }
  }, [navigate, nom, prenom]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleViewReservations = () => {
    navigate("/reservations");
  };

  const handleAdminReservations = () => {
    navigate("/admin-reservations");
  };

  return (
    <div className="my-account">
      <h1 className="my-account__title">Bienvenue sur votre espace personnel</h1>
      {nom && prenom && (
        <p className="my-account__subtitle">Bonjour {prenom} {nom}</p>
      )}

      <div className="my-account__actions">
        <button className="my-account__button" onClick={handleViewReservations}>
          Voir mes réservations
        </button>

        {isAdmin && (
          <button className="my-account__button my-account__button--admin" onClick={handleAdminReservations}>
            Gérer les réservations (admin)
          </button>
        )}
        {isAdmin && (
  <button
    className="my-account__button my-account__button--admin"
    onClick={() => navigate('/admin-stats')}
  >
    Statistiques des réservations
  </button>
)}


        <button className="my-account__button my-account__button--logout" onClick={handleLogout}>
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default MyAccount;
