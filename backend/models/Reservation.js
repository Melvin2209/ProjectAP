const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Reservation = sequelize.define('reservation', {
  Id_Reservation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Id_Utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateur',
      key: 'Id_Utilisateur'
    }
  },
  num: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'traversee',
      key: 'num'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'reservation',
  timestamps: false
});

module.exports = Reservation;
