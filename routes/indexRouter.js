const router = require('express').Router();

const middlewares = require('../middlewares/indexMiddlewares');
const controller = require('../controllers/indexController');

router.get('/products', controller.getProducts);
router.get('/products/:id', controller.getProductsById);
router.post('/products', middlewares.validateProducts, controller.postProduct);
router.put('/products/:id', middlewares.validateProducts, controller.putProduct);
router.delete('/products/:id', controller.deleteProduct);

router.get('/sales', controller.getSales);
router.get('/sales/:id', controller.getSalesById);
router.post('/sales', middlewares.postValidate, controller.postSale);
router.put('/sales/:id', controller.putSale);
router.delete('/sales/:id', controller.deleteSale);

module.exports = router;