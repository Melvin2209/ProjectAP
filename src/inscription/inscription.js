import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import './inscription.scss';

function Inscription() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '', 
    email: '',
    motDePasse: '',
    confirmMotDePasse: '',
  });

  const [error, setError] = useState(''); // Ajouter un état pour l'erreur
  const [successMessage, setSuccessMessage] = useState(''); // Message de succès
  const navigate = useNavigate(); // Initialiser navigate pour la redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la correspondance des mots de passe
    if (formData.motDePasse !== formData.confirmMotDePasse) {
      setError('Les mots de passe ne correspondent pas.'); // Affichage de l'erreur
      setFormData({ ...formData, motDePasse: '', confirmMotDePasse: '' }); // Réinitialiser les champs
      return;
    }

    // Si les mots de passe correspondent, on peut soumettre le formulaire
    setError(''); // Réinitialiser l'erreur si tout est ok
    console.log(formData); // Affichage des données du formulaire

    try {
      const response = await fetch('http://localhost/Marieteam/inscription.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setSuccessMessage(result.message); // Affichage du message de succès
        // Redirection avec un état qui indique que l'inscription a réussi
        navigate('/login', { state: { success: 'Inscription réussie! Vous pouvez maintenant vous connecter.' } });
      } else {
        setError(result.message); // Affichage de l'erreur
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

        {/* Affichage de l'erreur si les mots de passe ne correspondent pas */}
        {error && <p className="inscription__error-message">{error}</p>}
        {successMessage && <p className="inscription__success-message">{successMessage}</p>}

        <button className="inscription__button" type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;
