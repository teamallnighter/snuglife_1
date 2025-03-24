const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class VariationsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const variations = await db.variations.create(
      {
        id: data.id || undefined,

        size: data.size || null,
        color: data.color || null,
        stock: data.stock || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await variations.setProduct(data.product || null, {
      transaction,
    });

    return variations;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const variationsData = data.map((item, index) => ({
      id: item.id || undefined,

      size: item.size || null,
      color: item.color || null,
      stock: item.stock || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const variations = await db.variations.bulkCreate(variationsData, {
      transaction,
    });

    // For each item created, replace relation files

    return variations;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const variations = await db.variations.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.size !== undefined) updatePayload.size = data.size;

    if (data.color !== undefined) updatePayload.color = data.color;

    if (data.stock !== undefined) updatePayload.stock = data.stock;

    updatePayload.updatedById = currentUser.id;

    await variations.update(updatePayload, { transaction });

    if (data.product !== undefined) {
      await variations.setProduct(
        data.product,

        { transaction },
      );
    }

    return variations;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const variations = await db.variations.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of variations) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of variations) {
        await record.destroy({ transaction });
      }
    });

    return variations;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const variations = await db.variations.findByPk(id, options);

    await variations.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await variations.destroy({
      transaction,
    });

    return variations;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const variations = await db.variations.findOne({ where }, { transaction });

    if (!variations) {
      return variations;
    }

    const output = variations.get({ plain: true });

    output.product = await variations.getProduct({
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
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.size) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('variations', 'size', filter.size),
        };
      }

      if (filter.color) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('variations', 'color', filter.color),
        };
      }

      if (filter.stockRange) {
        const [start, end] = filter.stockRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            stock: {
              ...where.stock,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            stock: {
              ...where.stock,
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
      const { rows, count } = await db.variations.findAndCountAll(queryOptions);

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
          Utils.ilike('variations', 'size', query),
        ],
      };
    }

    const records = await db.variations.findAll({
      attributes: ['id', 'size'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['size', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.size,
    }));
  }
};
