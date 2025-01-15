import React, { useState } from "react";
import "./Login.scss";
import ancreImage from "../Icon/ancre-de-bateau.png";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(email,password)
      const response = await fetch('http://localhost/Marieteam/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    

      const result = await response.json();

      if (result.success) {
        setMessage(result.message); // Connexion réussie
      } else {
        setMessage(result.message); // Erreur d'identifiants ou autre
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
        {message && <p className="login-page__message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
