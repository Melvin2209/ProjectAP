import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateReservation.scss';

function CreateReservation() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [traversee, setTraversees] = useState([]);
  const [selectedTraversee, setSelectedTraversee] = useState('');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }

    const fetchTraversees = async () => {
      try {
        const response = await fetch('http://localhost:3000/traversees');
        const data = await response.json();
        setTraversees(data);
      } catch (error) {
        console.error('Erreur lors du chargement des traversées', error);
      }
    };

    fetchTraversees();
  }, [navigate, userId]);

  const handleReservation = async () => {
    try {
      const response = await fetch('http://localhost:3000/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, num: selectedTraversee }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Réservation enregistrée avec succès !');
        navigate('/reservations');
      } else {
        alert(data.message || 'Erreur lors de la réservation.');
      }
    } catch (error) {
      console.error('Erreur lors de la réservation', error);
    }
  };

  return (
    <div className="create-reservation-page">
      <h1>Nouvelle Réservation</h1>
      <div className="form-group">
        <label>Choisir une traversée :</label>
        <select
          value={selectedTraversee}
          onChange={(e) => setSelectedTraversee(e.target.value)}
        >
          <option value="">-- Sélectionner --</option>
          {traversee.map((tr) => (
            <option key={tr.num} value={tr.num}>
              {tr.num} - {tr.code} à {tr.dateT} à {tr.heure}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleReservation}
        disabled={!selectedTraversee}
        className="reservation-button"
      >
        Réserver
      </button>
    </div>
  );
}

export default CreateReservation;
