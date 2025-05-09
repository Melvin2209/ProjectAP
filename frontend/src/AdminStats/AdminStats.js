import React, { useEffect, useState } from 'react';
import './AdminStats.scss';

function AdminStats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/traversees/statistiques')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Erreur chargement statistiques', err));
  }, []);

  return (
    <div className="admin-stats">
      <h1>Statistiques des réservations par traversée</h1>
      <table>
        <thead>
          <tr>
            <th>Num Traversée</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Nombre de réservations</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s, index) => (
            <tr key={index}>
              <td>{s.num}</td>
              <td>{s.dateT}</td>
              <td>{s.heure}</td>
              <td>{s.nbReservations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminStats;
