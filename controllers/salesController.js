const { validateBody } = require('../services/salesService');
const salesService = require('../services/salesService');

const salesController = {
  post: async (req, res) => {
    req.body.map((obj) => validateBody(obj));

    await salesService.checkIfExist(req.body);
    const result = await salesService.post(req.body);
    res.status(201).json(result);
  },

  getAll: async (req, res) => {
    const sales = await salesService.getAll();
    res.status(200).json(sales);
  },

  getById: async (req, res) => {
    const { id } = salesService.validateParamsId(req.params);
    await salesService.checkSaleExists(id);
    const sale = await salesService.getById(id);
    res.status(200).json(sale);
  },

  delete: async (req, res) => {
    const { id } = salesService.validateParamsId(req.params);
    await salesService.checkSaleExists(id);
    await salesService.delete(id);
    res.sendStatus(204);
  },

  put: async (req, res) => {
    const { id } = salesService.validateParamsId(req.params);
    req.body.map((obj) => validateBody(obj));
    await salesService.checkIfExist(req.body);
    await salesService.checkSaleExists(id);
    await salesService.put(req.body, id);
    res.status(200).json({ saleId: id, itemsUpdated: req.body });
  },
};

module.exports = salesController;