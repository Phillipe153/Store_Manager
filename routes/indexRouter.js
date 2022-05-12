const router = require('express').Router();

// const middlewares = require('../middlewares/indexMiddlewares');
const controller = require('../controllers/indexController');

router.get('/products', controller.getProducts);
router.get('/products/:id', controller.getProductsById);
router.post('/products', controller.postProduct);
router.put('/products/:id', controller.putProduct);

router.get('/sales', controller.getSales);
router.get('/sales/:id', controller.getSalesById);

module.exports = router;