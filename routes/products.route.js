const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/search', productsController.search);
productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.post('/', productsController.post);
productsRouter.put('/:id', productsController.put);
productsRouter.delete('/:id', productsController.delete);

module.exports = productsRouter;