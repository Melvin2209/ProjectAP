import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './inscription.scss';

function Inscription() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '', 
    email: '',
    motDePasse: '',
    confirmMotDePasse: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.motDePasse !== formData.confirmMotDePasse) {
      setError('Les mots de passe ne correspondent pas.');
      setFormData({ ...formData, motDePasse: '', confirmMotDePasse: '' });
      return;
    }

    setError('');

    // ✅ Création de payload avec les bons noms pour le backend
    const payload = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      mdp: formData.motDePasse // backend attend "mdp"
    };

    try {
      console.log("📦 Payload envoyé au backend :", payload);

      const response = await fetch('http://localhost:3000/marieteam/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setSuccessMessage(result.message);
        navigate('/login', {
          state: {
            success: 'Inscription réussie! Vous pouvez maintenant vous connecter.',
          },
        });
      } else {
        setError(result.message || 'Une erreur est survenue.');
      }
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="inscription"> 
      <h2 className="inscription__text">Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="inscription__form-group">
          <label className="inscription__form-group__label" htmlFor="nom">Nom :</label>
          <input
            type="text"
            id="nom"
            name="nom"
            className="inscription__input"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inscription__form-group">
          <label className="inscription__form-group__label" htmlFor="prenom">Prénom :</label> 
          <input
            type="text"
            id="prenom"
            name="prenom"
            className="inscription__input"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inscription__form-group">
          <label className="inscription__form-group__label" htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            className="inscription__input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inscription__form-group">
          <label className="inscription__form-group__label" htmlFor="motDePasse">Mot de passe :</label>
          <input
            type="password"
            id="motDePasse"
            name="motDePasse"
            className="inscription__input"
            value={formData.motDePasse}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inscription__form-group">
          <label className="inscription__form-group__label" htmlFor="confirmMotDePasse">Confirmer le mot de passe :</label>
          <input
            type="password"
            id="confirmMotDePasse"
            name="confirmMotDePasse"
            className="inscription__input"
            value={formData.confirmMotDePasse}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="inscription__error-message">{error}</p>}
        {successMessage && <p className="inscription__success-message">{successMessage}</p>}

        <button className="inscription__button" type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;
