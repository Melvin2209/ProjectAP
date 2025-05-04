const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Utilisateur = sequelize.define('Utilisateur', {
  Id_Utilisateur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  mdp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  freezeTableName: true,
  tableName: 'utilisateur',
  timestamps: false
});

module.exports = Utilisateur;
