const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Bateau = sequelize.define('bateau', {
  Id_Bateau: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // Ajout recommandé si ce champ est en AUTO_INCREMENT dans ta BDD
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  longueur: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  largeur: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  freezeTableName: true,
  tableName: 'bateau',
  timestamps: false
});

module.exports = Bateau;
