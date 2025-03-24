const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const products = sequelize.define(
    'products',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      price: {
        type: DataTypes.DECIMAL,
      },

      category: {
        type: DataTypes.ENUM,

        values: ['Men', 'Women', 'Kids'],
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

  products.associate = (db) => {
    db.products.belongsToMany(db.reviews, {
      as: 'reviews',
      foreignKey: {
        name: 'products_reviewsId',
      },
      constraints: false,
      through: 'productsReviewsReviews',
    });

    db.products.belongsToMany(db.reviews, {
      as: 'reviews_filter',
      foreignKey: {
        name: 'products_reviewsId',
      },
      constraints: false,
      through: 'productsReviewsReviews',
    });

    db.products.belongsToMany(db.variations, {
      as: 'variations',
      foreignKey: {
        name: 'products_variationsId',
      },
      constraints: false,
      through: 'productsVariationsVariations',
    });

    db.products.belongsToMany(db.variations, {
      as: 'variations_filter',
      foreignKey: {
        name: 'products_variationsId',
      },
      constraints: false,
      through: 'productsVariationsVariations',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.products.hasMany(db.order_items, {
      as: 'order_items_product',
      foreignKey: {
        name: 'productId',
      },
      constraints: false,
    });

    db.products.hasMany(db.reviews, {
      as: 'reviews_product',
      foreignKey: {
        name: 'productId',
      },
      constraints: false,
    });

    db.products.hasMany(db.variations, {
      as: 'variations_product',
      foreignKey: {
        name: 'productId',
      },
      constraints: false,
    });

    //end loop

    db.products.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.products.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return products;
};
