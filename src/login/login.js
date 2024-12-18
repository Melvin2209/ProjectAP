import React from "react";
import './Login.scss';
import ancreImage from '../Icon/ancre-de-bateau.png';
import { Link } from 'react-router-dom';



function Login() {
  return (
    <div class="login-page">
      <img class="navbar__logo" src={ancreImage}/>
      <h1 class="login-page__welcome">Bienvenue chez MarieTeam</h1>
      <div class="login-page__connexion">
        <h1>Connexion</h1>
        <form class="login-page__formulaire">
          <div class="login-page__formulaire-group">
            <label class="login-page__formulaire-group--text" htmlFor="email">Email :</label>
            <input class="login-page__input" type="email" id="email" name="email" required />
          </div>
          <div class="login-page__formulaire-group">
            <label class="login-page__formulaire-group--text" htmlFor="password">Mot de passe :</label>
            <input class="login-page__input" type="password" id="password" name="password" required />
          </div>
          <button class="login-page__button" type="submit">Se connecter</button>
          <Link className="login-page__button" to="/mdp">Mot de passe oublié ?</Link>
          <Link className="login-page__button" to="/Inscription">Inscription</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
