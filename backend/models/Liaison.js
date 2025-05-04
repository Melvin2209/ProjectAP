const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Liaison = sequelize.define('liaison', {
  code: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  distance: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Id_Port: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Id_Port_1: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Id_Secteur: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: 'liaison',
  timestamps: false
});

// Associations déplacées dans index.js
module.exports = Liaison;
