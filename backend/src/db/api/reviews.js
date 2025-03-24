const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ReviewsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.create(
      {
        id: data.id || undefined,

        rating: data.rating || null,
        comment: data.comment || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await reviews.setProduct(data.product || null, {
      transaction,
    });

    await reviews.setCustomer(data.customer || null, {
      transaction,
    });

    return reviews;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const reviewsData = data.map((item, index) => ({
      id: item.id || undefined,

      rating: item.rating || null,
      comment: item.comment || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const reviews = await db.reviews.bulkCreate(reviewsData, { transaction });

    // For each item created, replace relation files

    return reviews;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.rating !== undefined) updatePayload.rating = data.rating;

    if (data.comment !== undefined) updatePayload.comment = data.comment;

    updatePayload.updatedById = currentUser.id;

    await reviews.update(updatePayload, { transaction });

    if (data.product !== undefined) {
      await reviews.setProduct(
        data.product,

        { transaction },
      );
    }

    if (data.customer !== undefined) {
      await reviews.setCustomer(
        data.customer,

        { transaction },
      );
    }

    return reviews;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of reviews) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of reviews) {
        await record.destroy({ transaction });
      }
    });

    return reviews;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.findByPk(id, options);

    await reviews.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await reviews.destroy({
      transaction,
    });

    return reviews;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.findOne({ where }, { transaction });

    if (!reviews) {
      return reviews;
    }

    const output = reviews.get({ plain: true });

    output.product = await reviews.getProduct({
      transaction,
    });

    output.customer = await reviews.getCustomer({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.products,
        as: 'product',

        where: filter.product
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.product
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  name: {
                    [Op.or]: filter.product
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.customers,
        as: 'customer',

        where: filter.customer
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.customer
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  first_name: {
                    [Op.or]: filter.customer
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.comment) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('reviews', 'comment', filter.comment),
        };
      }

      if (filter.ratingRange) {
        const [start, end] = filter.ratingRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            rating: {
              ...where.rating,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            rating: {
              ...where.rating,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    const queryOptions = {
      where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.reviews.findAndCountAll(queryOptions);

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(query, limit, offset) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('reviews', 'comment', query),
        ],
      };
    }

    const records = await db.reviews.findAll({
      attributes: ['id', 'comment'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['comment', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.comment,
    }));
  }
};
