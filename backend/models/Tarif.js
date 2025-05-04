// models/Tarif.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Tarif = sequelize.define('tarif', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'liaison',
      key: 'code'
    }
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categorie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prix_basse: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  prix_moyenne: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  prix_haute: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: 'tarif',
  timestamps: false
});

  
module.exports = Tarif;
