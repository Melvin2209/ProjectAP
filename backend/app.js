const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require(__dirname + '/database');
const traverseeRoutes = require('./routes/traversee');
const reservationRoutes = require('./routes/reservation');
const Reservation = require('./models/Reservation');
const Traversee = require('./models/Traversee');
const Liaison = require('./models/Liaison');
const Port = require('./models/Port');
const Bateau = require('./models/Bateau');
const Enregistrer = require('./models/Enregistrer');
const Tarif = require('./models/Tarif');



const app = express();

app.use(cors()); // 🔥 Active CORS pour toutes les requêtes
app.use(bodyParser.json());

// Importer les modèles
const User = require('./models/User');
// const stuffRoutes = require('./routes/stuff');
const userRoute = require('./routes/user');

// Synchroniser la base de données
sequelize.sync()
    .then(() => console.log('Connexion MySQL réussie'))
    .catch(err => console.error('Erreur de connexion MySQL :', err));

// Middleware CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Appel des associations (si elles existent)
const models = { Reservation, Traversee, Liaison, Port, Bateau, Enregistrer, Tarif };

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

// app.use('/marieteam/api/stuff', stuffRoutes);
app.use('/marieteam', userRoute);
app.use('/reservations', reservationRoutes);
app.use('/traversees', traverseeRoutes);

module.exports = app;
