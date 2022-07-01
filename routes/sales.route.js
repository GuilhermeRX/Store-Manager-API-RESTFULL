const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.post('/', salesController.post);
salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);
salesRouter.delete('/:id', salesController.delete);
salesRouter.put('/:id', salesController.put);
module.exports = salesRouter;