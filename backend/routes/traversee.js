const express = require('express');
const router = express.Router();
const Traversee = require('../models/Traversee');
const Liaison = require('../models/Liaison');
const Port = require('../models/Port');
const Bateau = require('../models/Bateau');
const Tarif = require('../models/Tarif'); // ✅ Manquait !

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
    const updated = await Traversee.update({ dateT, heure, code, Id_Bateau }, {
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

module.exports = router;
