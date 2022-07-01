const express = require('express');
require('express-async-errors');
const productsRouter = require('./routes/products.route');
const salesRouter = require('./routes/sales.route');

const app = express();
app.use(express.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use((err, _req, res, _next) => {
  const { message } = err;

  const required = message === '"name" is required';
  const length = message === '"name" length must be at least 5 characters long';
  const quantity = message === '"quantity" must be greater than or equal to 1';
  const notFound = message.includes('not found');

  switch (true) {
    case required: return res.status(400).json({ message });
    case length: return res.status(422).json({ message });
    case notFound: return res.status(404).json({ message });
    case quantity: return res.status(422).json({ message });
    default: return res.status(400).json({ message });
  }
});
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;