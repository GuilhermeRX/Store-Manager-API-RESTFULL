const productsService = require('../services/productsService');

const productsController = {
  getAll: async (_req, res) => {
    const products = await productsService.getAll();
    res.status(200).json(products);
  },

  getById: async (req, res) => {
    const { id } = productsService.validateParamsId(req.params);
    await productsService.checkIfExists(id);
    const products = await productsService.getById(id);
    res.status(200).json(products);
  },

  post: async (req, res) => {
    const { name } = productsService.validateBody(req.body);
    const id = await productsService.post(name);
    res.status(201).json({ id, name });
  },

  put: async (req, res) => {
    const { id } = productsService.validateParamsId(req.params);
    await productsService.checkIfExists(id);
    const { name } = productsService.validateBody(req.body);

    await productsService.put({ id, name });
    res.status(200).json({ id, name });
  },

  delete: async (req, res) => {
    const { id } = productsService.validateParamsId(req.params);
    await productsService.checkIfExists(id);
    await productsService.delete(id);
    res.sendStatus(204);
  },

  search: async (req, res) => {
    const search = await productsService.searchTerm(req.query.q);
    res.status(200).json(search);
  },
};

module.exports = productsController;