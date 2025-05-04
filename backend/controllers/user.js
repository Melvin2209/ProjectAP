const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/User');  // Utilisation du modèle correct

exports.signup = (req, res, next) => {
  console.log("🔍 Données reçues dans signup :", req.body);
  console.log("🔐 Mot de passe reçu (avant hash) :", req.body.mdp);

  bcrypt.hash(req.body.mdp, 10)
      .then(hash => {
          console.log("🔐 Mot de passe haché :", hash);

          return Utilisateur.create({
              prenom: req.body.prenom,
              nom: req.body.nom,
              email: req.body.email,
              mdp: hash,
              isAdmin: req.body.isAdmin || false  // ✅ accepte la valeur du front ou false par défaut
          });
      })
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => {
          console.error("❌ Erreur création utilisateur :", error);
          res.status(400).json({ error });
      });
};



exports.getUtilisateur = async (req, res) => {
    const Utilisateur = require('../models/User');
    try {
      const utilisateurs = await Utilisateur.findAll();
      res.status(200).json(utilisateurs);
    } catch (error) {
      console.log("❌ ERREUR :", error);  // <-- Ajoute ça
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
  };
  
  
  exports.login = (req, res, next) => {
    Utilisateur.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }

            bcrypt.compare(req.body.mdp, user.mdp)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }

                    res.status(200).json({
                        success: true,
                        userId: user.Id_Utilisateur,
                        prenom: user.prenom,
                        nom: user.nom,
                        isAdmin: user.isAdmin, // ✅ Ajouté ici
                        token: jwt.sign(
                            { userId: user.Id_Utilisateur },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

