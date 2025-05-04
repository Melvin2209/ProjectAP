const express = require('express');
const router = express.Router();
const reservationCtrl = require('../controllers/reservationController');

// 👇 AJOUTE cette ligne si elle n’existe pas déjà
router.post('/', reservationCtrl.createReservation);

router.get('/user/:userId', reservationCtrl.getReservationsByUser);
router.delete('/:reservationId', reservationCtrl.deleteReservation);
router.put('/:reservationId', reservationCtrl.updateReservation);

module.exports = router;
