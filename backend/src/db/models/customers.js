const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const customers = sequelize.define(
    'customers',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      first_name: {
        type: DataTypes.TEXT,
      },

      last_name: {
        type: DataTypes.TEXT,
      },

      email: {
        type: DataTypes.TEXT,
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

  customers.associate = (db) => {
    db.customers.belongsToMany(db.orders, {
      as: 'orders',
      foreignKey: {
        name: 'customers_ordersId',
      },
      constraints: false,
      through: 'customersOrdersOrders',
    });

    db.customers.belongsToMany(db.orders, {
      as: 'orders_filter',
      foreignKey: {
        name: 'customers_ordersId',
      },
      constraints: false,
      through: 'customersOrdersOrders',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.customers.hasMany(db.orders, {
      as: 'orders_customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.customers.hasMany(db.reviews, {
      as: 'reviews_customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    //end loop

    db.customers.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.customers.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return customers;
};
