const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Port = sequelize.define('port', {
  Id_Port: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: 'port',
  timestamps: false
});


module.exports = Port;
