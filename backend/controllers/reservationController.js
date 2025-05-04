// 📦 Import des modèles
const { Reservation, Traversee, Liaison, Bateau, Port, Enregistrer } = require('../models');

exports.getReservationsByUser = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const reservations = await Reservation.findAll({
        where: { Id_Utilisateur: userId },
        include: [
          {
            model: Traversee,
            include: [
              {
                model: require('../models/Liaison'),
                include: [
                  { model: require('../models/Port'), as: 'portDepart' },
                  { model: require('../models/Port'), as: 'portArrivee' }
                ]
              },
              {
                model: require('../models/Bateau')
              }
            ]
          },
          {
            model: Enregistrer // ✅ Pas d'inclusion dans Enregistrer
          }
        ]
      });
  
      res.status(200).json(reservations);
    } catch (error) {
      console.error("❌ Erreur récupération réservations :", error);
      res.status(500).json({ error: "Erreur serveur lors de la récupération." });
    }
  };
  

  
// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
    const reservationId = req.params.reservationId;
    console.log("🔍 Suppression de la réservation ID :", reservationId);
  
    try {
      // Supprimer les enregistrements liés
      await Enregistrer.destroy({
        where: { Id_Reservation: reservationId }
      });
  
      // Ensuite supprimer la réservation
      const deleted = await Reservation.destroy({
        where: { Id_Reservation: reservationId }
      });
  
      if (deleted) {
        res.status(200).json({ message: "Réservation supprimée avec succès." });
      } else {
        res.status(404).json({ message: "Réservation introuvable." });
      }
    } catch (error) {
      console.error("❌ Erreur suppression réservation :", error);
      res.status(500).json({ error: "Erreur serveur lors de la suppression." });
    }
  };
  
  
  

// Modifier une réservation (ex: changer de traversée)
exports.updateReservation = async (req, res) => {
  const reservationId = req.params.reservationId;
  const { num } = req.body; // On suppose ici qu'on ne modifie que le numéro de traversée

  try {
    const updated = await Reservation.update(
      { num },
      { where: { Id_Reservation: reservationId } }
    );

    if (updated[0] > 0) {
      res.status(200).json({ message: "Réservation mise à jour avec succès." });
    } else {
      res.status(404).json({ message: "Réservation non trouvée." });
    }
  } catch (error) {
    console.error("Erreur mise à jour réservation :", error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
  }
};

exports.createReservation = async (req, res) => {
    const { userId, num } = req.body;
  
    if (!userId || !num) {
      return res.status(400).json({ message: "Données manquantes." });
    }
  
    try {
      const nouvelleReservation = await require('../models/Reservation').create({
        Id_Utilisateur: userId,
        num: num
      });
  
      res.status(201).json({ success: true, reservation: nouvelleReservation });
    } catch (error) {
      console.error("❌ Erreur lors de la création de la réservation :", error);
      res.status(500).json({ message: "Erreur serveur lors de la réservation." });
    }
  };
  