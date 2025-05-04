import React, { useEffect, useState } from 'react';
import './AdminReservation.scss';

function AdminReservation() {
  const [traversees, setTraversees] = useState([]);
  const [newTraversee, setNewTraversee] = useState({
    num: '',
    dateT: '',
    heure: '',
    code: '',
    Id_Bateau: ''
  });

  const [editValues, setEditValues] = useState({}); // 👈 valeurs modifiées par traversée

  useEffect(() => {
    fetchTraversees();
  }, []);

  const fetchTraversees = async () => {
    const res = await fetch('http://localhost:3000/traversees');
    const data = await res.json();
    console.log('Données reçues :', data); // 👀 À vérifier
    setTraversees(data);

    // initialise les valeurs modifiables
    const initialValues = {};
    data.forEach(tr => {
      initialValues[tr.num] = {
        dateT: tr.dateT,
        heure: tr.heure,
        Id_Bateau: tr.Id_Bateau
      };
    });
    setEditValues(initialValues);
  };

  const handleInputChange = (e) => {
    setNewTraversee({ ...newTraversee, [e.target.name]: e.target.value });
  };

  const createTraversee = async () => {
    const response = await fetch('http://localhost:3000/traversees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTraversee),
    });

    if (response.ok) {
      fetchTraversees();
      setNewTraversee({ num: '', dateT: '', heure: '', code: '', Id_Bateau: '' });
    }
  };

  const deleteTraversee = async (num) => {
    await fetch(`http://localhost:3000/traversees/${num}`, { method: 'DELETE' });
    fetchTraversees();
  };

  const handleEditChange = (num, field, value) => {
    setEditValues(prev => ({
      ...prev,
      [num]: {
        ...prev[num],
        [field]: value
      }
    }));
  };

  const updateTraversee = async (num) => {
    const updates = editValues[num];
    await fetch(`http://localhost:3000/traversees/${num}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    fetchTraversees();
  };

  return (
    <div className="admin-reservation-page">
      <h1>Gestion des Traversées</h1>

      <div className="form-section">
        <h2>Nouvelle Traversée</h2>
        <input name="num" placeholder="Numéro" value={newTraversee.num} onChange={handleInputChange} />
        <input name="dateT" type="date" value={newTraversee.dateT} onChange={handleInputChange} />
        <input name="heure" type="time" value={newTraversee.heure} onChange={handleInputChange} />
        <input name="code" placeholder="Code liaison" value={newTraversee.code} onChange={handleInputChange} />
        <input name="Id_Bateau" placeholder="ID Bateau" value={newTraversee.Id_Bateau} onChange={handleInputChange} />
        <button onClick={createTraversee}>Ajouter</button>
      </div>

      <h2>Liste des Traversées</h2>
      {traversees.map((tr) => (
        <div key={tr.num} className="traversee-card">
          <p><strong>Num :</strong> {tr.num}</p>
          <p>
            <strong>Date :</strong>
            <input
              type="date"
              value={editValues[tr.num]?.dateT || ''}
              onChange={(e) => handleEditChange(tr.num, 'dateT', e.target.value)}
            />
          </p>
          <p>
            <strong>Heure :</strong>
            <input
              type="time"
              value={editValues[tr.num]?.heure || ''}
              onChange={(e) => handleEditChange(tr.num, 'heure', e.target.value)}
            />
          </p>
          <p>
            <strong>Bateau :</strong>
            <input
              type="number"
              value={editValues[tr.num]?.Id_Bateau || ''}
              onChange={(e) => handleEditChange(tr.num, 'Id_Bateau', e.target.value)}
            />
          </p>
          <p><strong>Code liaison :</strong> {tr.code}</p>

          <div className="btn-group">
            <button onClick={() => updateTraversee(tr.num)}>Modifier</button>
            <button className="delete" onClick={() => deleteTraversee(tr.num)}>Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminReservation;
