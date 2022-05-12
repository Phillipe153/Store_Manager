const express = require('express');
// const controller = require('./controllers/productsController');
const router = require('./routes/indexRouter');

const app = express();
app.use(router);

// app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'ping' });
});

// app.get('/products', controller.getProducts);
// app.get('/products/:id', controller.getProductsById);

// app.get('/sales', controller.getSales);
// app.get('/sales/:id', controller.getSalesById);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
