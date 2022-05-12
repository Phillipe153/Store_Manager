const express = require('express');
// const controller = require('./controllers/productsController');
const router = require('./routes/indexRouter');

const app = express();
app.use(express.json());
app.use(router);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'ping' });
});

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: err.message });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
