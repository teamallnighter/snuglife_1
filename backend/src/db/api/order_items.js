const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Order_itemsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const order_items = await db.order_items.create(
      {
        id: data.id || undefined,

        quantity: data.quantity || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await order_items.setOrder(data.order || null, {
      transaction,
    });

    await order_items.setProduct(data.product || null, {
      transaction,
    });

    return order_items;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const order_itemsData = data.map((item, index) => ({
      id: item.id || undefined,

      quantity: item.quantity || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const order_items = await db.order_items.bulkCreate(order_itemsData, {
      transaction,
    });

    // For each item created, replace relation files

    return order_items;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const order_items = await db.order_items.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.quantity !== undefined) updatePayload.quantity = data.quantity;

    updatePayload.updatedById = currentUser.id;

    await order_items.update(updatePayload, { transaction });

    if (data.order !== undefined) {
      await order_items.setOrder(
        data.order,

        { transaction },
      );
    }

    if (data.product !== undefined) {
      await order_items.setProduct(
        data.product,

        { transaction },
      );
    }

    return order_items;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const order_items = await db.order_items.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of order_items) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of order_items) {
        await record.destroy({ transaction });
      }
    });

    return order_items;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const order_items = await db.order_items.findByPk(id, options);

    await order_items.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await order_items.destroy({
      transaction,
    });

    return order_items;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const order_items = await db.order_items.findOne(
      { where },
      { transaction },
    );

    if (!order_items) {
      return order_items;
    }

    const output = order_items.get({ plain: true });

    output.order = await order_items.getOrder({
      transaction,
    });

    output.product = await order_items.getProduct({
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
        model: db.orders,
        as: 'order',

        where: filter.order
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.order
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  order_date: {
                    [Op.or]: filter.order
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

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

      if (filter.quantityRange) {
        const [start, end] = filter.quantityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
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
      const { rows, count } = await db.order_items.findAndCountAll(
        queryOptions,
      );

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
          Utils.ilike('order_items', 'quantity', query),
        ],
      };
    }

    const records = await db.order_items.findAll({
      attributes: ['id', 'quantity'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['quantity', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.quantity,
    }));
  }
};
