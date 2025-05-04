import React, { useEffect, useState } from 'react';
import './Reservations.scss';
import { useNavigate } from 'react-router-dom';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/reservations/user/${userId}`);
        if (!response.ok) throw new Error('Erreur serveur');
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Erreur lors du chargement des réservations :", error);
      }
    };

    fetchReservations();
  }, [userId]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette réservation ?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/reservations/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setReservations(prev => prev.filter(res => res.Id_Reservation !== id));
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="reservations-page">
      <h1>Mes Réservations</h1>

      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <div className="reservations-list">
          {reservations.map((res, index) => (
            <div className="reservation-card" key={index}>
              <h2>Réservation n°{res.Id_Reservation}</h2>
              <p><strong>Départ :</strong> {res.traversee?.liaison?.portDepart?.nom}</p>
              <p><strong>Arrivée :</strong> {res.traversee?.liaison?.portArrivee?.nom}</p>
              <p><strong>Bateau :</strong> {res.traversee?.bateau?.nom}</p>

              <button
                className="reservation-delete-btn"
                onClick={() => handleDelete(res.Id_Reservation)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reservations;
