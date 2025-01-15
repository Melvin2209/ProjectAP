import './TrajetsPrice.scss';
import ancreImage from '../Icon/ancre-de-bateau.png';

//todo: responsive
function TrajetsPrice() {
  return (
        <div class="TrajetsPrice">
            <div class="TrajetsPrice__title">
                <img class="TrajetsPrice__logo" src={ancreImage}/>
                <h1 class="TrajetsPrice__title-text">Découvrez nos trajets et leurs prix</h1>
                <img class="TrajetsPrice__logo" src={ancreImage}/>
            </div>
              {/* Tableau des trajets */}
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
                    <tr>
                        <td className="TrajetsPrice__table-cell">Atlantique</td>
                        <td className="TrajetsPrice__table-cell">A001</td>
                        <td className="TrajetsPrice__table-cell">25</td>
                        <td className="TrajetsPrice__table-cell">Nantes</td>
                        <td className="TrajetsPrice__table-cell">Saint-Nazaire</td>
                        <td className="TrajetsPrice__table-cell">En savoir plus</td>
                    </tr>
                    <tr>
                        <td className="TrajetsPrice__table-cell">Atlantique</td>
                        <td className="TrajetsPrice__table-cell">A001</td>
                        <td className="TrajetsPrice__table-cell">25</td>
                        <td className="TrajetsPrice__table-cell">Nantes</td>
                        <td className="TrajetsPrice__table-cell">Saint-Nazaire</td>
                        <td className="TrajetsPrice__table-cell">En savoir plus</td>
                    </tr>
                </tbody>
            </table>
        </div>
  );
}

export default TrajetsPrice;
