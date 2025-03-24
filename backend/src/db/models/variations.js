const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const variations = sequelize.define(
    'variations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      size: {
        type: DataTypes.TEXT,
      },

      color: {
        type: DataTypes.TEXT,
      },

      stock: {
        type: DataTypes.INTEGER,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  variations.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.variations.belongsTo(db.products, {
      as: 'product',
      foreignKey: {
        name: 'productId',
      },
      constraints: false,
    });

    db.variations.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.variations.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return variations;
};
