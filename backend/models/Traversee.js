const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Traversee = sequelize.define('traversee', {
  num: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  dateT: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  heure: {
    type: DataTypes.TIME,
    allowNull: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'liaison',
      key: 'code'
    }
  },
  Id_Bateau: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'bateau',
      key: 'Id_Bateau'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'traversee',
  timestamps: false
});

module.exports = Traversee;
