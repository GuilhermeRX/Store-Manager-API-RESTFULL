const Joi = require('joi');
const productsModel = require('../models/productsModel');
const runSchema = require('../validate');

const productsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBody: runSchema(Joi.object({
    name: Joi.string().required().min(5),
  })),

  getAll: async () => {
    const products = await productsModel.getAll();
    return products;
  },

  getById: async (id) => {
    const products = await productsModel.getById(id);
    return products;
  },

  checkIfExists: async (id) => {
    const exists = await productsModel.checkIfExists(id);
    if (!exists) throw new Error('Product not found');
    return true;
  },

  post: async (name) => {
    const insertId = await productsModel.post(name);
    return insertId;
  },

  put: async (obj) => {
    const affectedRows = await productsModel.put(obj);
    if (affectedRows !== 1) throw new Error('Não foi possivel inserir');
    return true;
  },

  delete: async (id) => {
    const affectedRows = await productsModel.delete(id);
    if (affectedRows !== 1) throw new Error('Impossivel deletar');
    return true;
  },

  searchTerm: async (search) => {
    if (!search) {
      const all = await productsModel.getAll();
      return all;
    }
    const searchResult = await productsModel.searchTerm(search);
    return searchResult;
  },
};

module.exports = productsService;