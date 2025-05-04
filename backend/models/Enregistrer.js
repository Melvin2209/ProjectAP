const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Enregistrer = sequelize.define('enregistrer', {
  lettre: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  Id_Type: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  Id_Reservation: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: 'enregistrer',
  timestamps: false
});


module.exports = Enregistrer;
