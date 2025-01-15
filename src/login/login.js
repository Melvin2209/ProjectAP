import React, { useState, useEffect } from "react";
import "./Login.scss";
import ancreImage from "../Icon/ancre-de-bateau.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Utiliser useLocation pour récupérer l'état passé

  // Afficher le message de succès si l'état est présent
  useEffect(() => {
    if (location.state && location.state.success) {
      setMessage(location.state.success); // Affichage du message passé lors de la redirection
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/Marieteam/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(result.message); 
        localStorage.setItem('userId', result.userId); // Remplacer 'userId' par l'ID ou le token que tu veux stocker
        navigate('/'); // Redirige vers la page d'accueil
      } else {
        setMessage(result.message); // Affiche le message d'erreur si échec
      }
    } catch (error) {
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="login-page">
      <img className="navbar__logo" src={ancreImage} alt="Logo" />
      <h1 className="login-page__welcome">Bienvenue chez MarieTeam</h1>
      <div className="login-page__connexion">
        <h1>Connexion</h1>
        {message && <p className="login-page__message">{message}</p>} {/* Affichage du message ici */}
        <form className="login-page__formulaire" onSubmit={handleSubmit}>
          <div className="login-page__formulaire-group">
            <label className="login-page__formulaire-group--text" htmlFor="email">Email :</label>
            <input
              className="login-page__input"
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-page__formulaire-group">
            <label className="login-page__formulaire-group--text" htmlFor="password">Mot de passe :</label>
            <input
              className="login-page__input"
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-page__button" type="submit">Se connecter</button>
          <Link className="login-page__button" to="/Inscription">Inscription</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
