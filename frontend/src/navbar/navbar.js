import './navbar.scss';
import { Link } from 'react-router-dom';
import ancreImage from '../Icon/ancre-de-bateau.png';
import connectionIcon from '../Icon/connexion.png';

function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/"><img className="navbar__logo" src={ancreImage} alt="Logo"/></Link>
        <div className="navbar__right">
          <ul className="navbar__liste">
            <Link className="navbar__link" to="/">Accueil</Link>
            <Link className="navbar__link" to="/TrajetsPrice">Trajets & prix</Link>
            <Link className="navbar__link" to="/creer-reservation">Réservations</Link>
            <Link className="navbar__link" to="/MyAccount">Mon compte</Link>
          </ul>
        </div>
        <Link to="/login"><img className="navbar__logo" src={connectionIcon} alt="Connexion"/></Link>
        <img src="/Icon/menu-btn.png" alt="Menu burger icon" className="navbar__burger-logo"/>
      </nav>
    </header>
  );
}

export default Navbar;
