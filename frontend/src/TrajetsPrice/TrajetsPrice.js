import React, { useEffect, useState } from 'react';
import './TrajetsPrice.scss';
import ancreImage from "../Icon/ancre-de-bateau.png";

// Composant fonctionnel
function TrajetsPrice() {
  const [traversees, setTraversees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/traversees")
      .then(response => {
        if (!response.ok) throw new Error("Erreur réseau");
        return response.json();
      })
      .then(data => setTraversees(data))
      .catch(error => console.error("Erreur API :", error));
  }, []);

  return (
    <div className="TrajetsPrice">
      <div className="TrajetsPrice__title">
        <img className="TrajetsPrice__logo" src={ancreImage} alt="ancre" />
        <h1 className="TrajetsPrice__title-text">Découvrez nos trajets et leurs prix</h1>
        <img className="TrajetsPrice__logo" src={ancreImage} alt="ancre" />
      </div>

      {/* Tableau dynamique */}
      <table className="TrajetsPrice__table">
        <thead className="TrajetsPrice__table-head">
          <tr>
            <th className="TrajetsPrice__table-cell">Secteur</th>
            <th className="TrajetsPrice__table-cell">Numéro Liaison</th>
            <th className="TrajetsPrice__table-cell">Distances en Miles marins</th>
            <th className="TrajetsPrice__table-cell">Port de Départ</th>
            <th className="TrajetsPrice__table-cell">Port D'arrivé</th>
            <th className="TrajetsPrice__table-cell">Tarifs</th>
          </tr>
        </thead>
        <tbody className="TrajetsPrice__table-body">
         
            {traversees.map((traversee, index) => (
              <tr key={index}>
                <td className="TrajetsPrice__table-cell">{traversee.liaison?.code}</td>
                <td className="TrajetsPrice__table-cell">{traversee.num}</td>
                <td className="TrajetsPrice__table-cell">{traversee.liaison?.distance}</td>
                <td className="TrajetsPrice__table-cell">{traversee.liaison?.portDepart?.nom}</td>
                <td className="TrajetsPrice__table-cell">{traversee.liaison?.portArrivee?.nom}</td>
                <td className="TrajetsPrice__table-cell">
  {traversee.liaison?.tarifs?.length > 0 ? (
    <ul>
      {traversee.liaison.tarifs.map((tarif, i) => (
        <li key={i}>
          {tarif.categorie} - {tarif.type} : {tarif.prix}€
        </li>
      ))}
    </ul>
  ) : (
    "Tarif non disponible"
  )}
</td>
              </tr> 
            ))}
          </tbody>
          
         
      </table>
    </div>
  );
}

export default TrajetsPrice;
