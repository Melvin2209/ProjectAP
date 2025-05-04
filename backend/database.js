const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('marieteam', 'root', '', {
    host: 'localhost', // ou l'IP de ton serveur MySQL
    dialect: 'mysql'
});

module.exports = sequelize;
