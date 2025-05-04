const Utilisateur = require('./User');
const Reservation = require('./Reservation');
const Traversee = require('./Traversee');
const Liaison = require('./Liaison');
const Port = require('./Port');
const Bateau = require('./Bateau');
const Enregistrer = require('./Enregistrer');
const Tarif = require('./Tarif'); // ✅ Ajout du modèle Tarif

// =====================
// Associations
// =====================

// Utilisateur → Reservation
Utilisateur.associate?.({ Reservation });
Reservation.belongsTo(Utilisateur, { foreignKey: 'Id_Utilisateur' });

// Reservation → Traversee
Reservation.belongsTo(Traversee, { foreignKey: 'num', targetKey: 'num' });
Traversee.hasMany(Reservation, { foreignKey: 'num', sourceKey: 'num' });

// Traversee → Liaison
Traversee.belongsTo(Liaison, { foreignKey: 'code', targetKey: 'code' });
Liaison.hasMany(Traversee, { foreignKey: 'code', sourceKey: 'code' });

// Traversee → Bateau
Traversee.belongsTo(Bateau, { foreignKey: 'Id_Bateau' });
Bateau.hasMany(Traversee, { foreignKey: 'Id_Bateau' });

// Liaison → Port (2 fois avec alias)
Liaison.belongsTo(Port, { foreignKey: 'Id_Port', as: 'portDepart' });
Liaison.belongsTo(Port, { foreignKey: 'Id_Port_1', as: 'portArrivee' });

// Reservation → Enregistrer
Reservation.hasMany(Enregistrer, { foreignKey: 'Id_Reservation' });
Enregistrer.associate?.({ Reservation }); // ✅ Appel conditionnel à associate

// Liaison → Tarif
Liaison.hasMany(Tarif, { foreignKey: 'code', sourceKey: 'code' });
Tarif.belongsTo(Liaison, { foreignKey: 'code', targetKey: 'code' }); // ✅ association inverse (utile pour les includes)

// =====================
// Export
// =====================
module.exports = {
  Utilisateur,
  Reservation,
  Traversee,
  Liaison,
  Port,
  Bateau,
  Enregistrer,
  Tarif // ✅ export du modèle Tarif
};
