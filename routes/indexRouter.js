const router = require('express').Router();

const middlewares = require('../middlewares/indexMiddlewares');
const controller = require('../controllers/indexController');

router.get('/products', controller.getProducts);
router.get('/products/:id', middlewares.validateProducts, controller.getProductsById);
router.post('/products', controller.postProduct);

router.get('/sales', controller.getSales);
router.get('/sales/:id', middlewares.validateSales, controller.getSalesById);

module.exports = router;