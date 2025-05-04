import React, { useState, useEffect } from "react";
import "./Login.scss";
import ancreImage from "../Icon/ancre-de-bateau.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 Vérifie si l'utilisateur est déjà connecté (localStorage)
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate('/MyAccount');
    }
  }, [navigate]);

  useEffect(() => {
    if (location.state && location.state.success) {
      setMessage(location.state.success);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      mdp: password,
    };

    try {
      const response = await fetch('http://localhost:3000/marieteam/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();


      if (result.success) {
        setMessage(result.message);
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('userNom', result.nom); // 👈 Ajoute ceci
        localStorage.setItem('userPrenom', result.prenom); // 👈 Et ceci
        localStorage.setItem('isAdmin', result.isAdmin);
        navigate('/MyAccount');
      } else {
        setMessage(result.message || 'Identifiants incorrects.');
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
        {message && <p className="login-page__message">{message}</p>}
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
