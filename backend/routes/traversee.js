const express = require('express');
const router = express.Router();
const Traversee = require('../models/Traversee');
const Liaison = require('../models/Liaison');
const Port = require('../models/Port');
const Bateau = require('../models/Bateau');
const Tarif = require('../models/Tarif');
const Reservation = require('../models/Reservation');
const Enregistrer = require('../models/Enregistrer');

// GET : toutes les traversées
router.get('/', async (req, res) => {
  try {
    const traversees = await Traversee.findAll({
      include: [
        {
          model: Liaison,
          include: [
            { model: Port, as: 'portDepart' },
            { model: Port, as: 'portArrivee' },
            { model: Tarif }
          ]
        },
        { model: Bateau }
      ]
    });
    res.status(200).json(traversees);
  } catch (err) {
    console.error("❌ Erreur récupération traversées :", err);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des traversées" });
  }
});

// POST : créer une traversée
router.post('/', async (req, res) => {
  try {
    const { num, dateT, heure, code, Id_Bateau } = req.body;
    const newTraversee = await Traversee.create({ num, dateT, heure, code, Id_Bateau });
    res.status(201).json(newTraversee);
  } catch (err) {
    console.error("Erreur création traversée :", err);
    res.status(500).json({ error: "Erreur lors de l'ajout de la traversée" });
  }
});

// PUT : modifier une traversée
router.put('/:num', async (req, res) => {
  try {
    const { dateT, heure, code, Id_Bateau } = req.body;
    await Traversee.update({ dateT, heure, code, Id_Bateau }, {
      where: { num: req.params.num }
    });
    res.status(200).json({ message: 'Traversée mise à jour' });
  } catch (err) {
    console.error("❌ Erreur mise à jour traversée :", err);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour" });
  }
});

// DELETE : supprimer une traversée
router.delete('/:num', async (req, res) => {
  try {
    await Traversee.destroy({ where: { num: req.params.num } });
    res.status(200).json({ message: 'Traversée supprimée' });
  } catch (err) {
    console.error("❌ Erreur suppression traversée :", err);
    res.status(500).json({ error: "Erreur serveur lors de la suppression" });
  }
});

// GET : Statistiques des réservations par traversée
router.get('/stats', async (req, res) => {
  try {
    const stats = await Traversee.findAll({
      include: [
        {
          model: Reservation,
          include: [Enregistrer]
        },
        {
          model: Liaison,
          include: [
            { model: Port, as: 'portDepart' },
            { model: Port, as: 'portArrivee' }
          ]
        },
        { model: Bateau }
      ]
    });

    const result = stats.map(tr => {
      const total = tr.reservations?.reduce((acc, res) => {
        const totalPassagers = res.enregistrers?.reduce((sum, enreg) => sum + enreg.quantite, 0) || 0;
        return acc + totalPassagers;
      }, 0) || 0;

      return {
        num: tr.num,
        date: tr.dateT,
        heure: tr.heure,
        liaison: `${tr.liaison?.portDepart?.nom} → ${tr.liaison?.portArrivee?.nom}`,
        bateau: tr.bateau?.nom,
        totalPassagers: total
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Erreur récupération statistiques :", err);
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques" });
  }
});

module.exports = router;
