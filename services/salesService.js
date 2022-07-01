const Joi = require('joi');
const salesModel = require('../models/salesModel');
const runSchema = require('../validate');
const productsService = require('./productsService');

const salesService = {
  validateBody: runSchema(Joi.object({
    productId: Joi.number().required().min(1),
    quantity: Joi.number().required().min(1),
  })),

  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().min(1),
  })),

  post: async (array) => {
    const insertId = await salesModel.post(array);
    const newInfo = {
      id: insertId,
      itemsSold: array,
    };
    return newInfo;
  },

  checkIfExist: async (array) => {
    await Promise.all(array.map(async (obj) => productsService.checkIfExists(obj.productId)));
    return true;
  },

  getAll: async () => {
    const sales = await salesModel.getAll();
    return sales;
  },

  getById: async (id) => {
    const sales = await salesModel.getById(id);
    return sales;
  },

  checkSaleExists: async (id) => {
    const exist = await salesModel.checkSalesExist(id);

    if (!exist) throw new Error('Sale not found');
    return true;
  },

  delete: async (id) => {
    const affectedRows = await salesModel.delete(id);
    if (!affectedRows) throw new Error('Sale not found');
    return true;
  },

  put: async (array, id) => {
    const affectedRows = await salesModel.put(array, id);
    return affectedRows;
  },
};

module.exports = salesService;
