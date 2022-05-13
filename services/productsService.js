// Renomeie esse arquivo
const model = require('../models/productsModel');

const erroHandler = (status, message) => ({
    status,
    message,
  });
const getProducts = async () => {
    const getAll = await model.getProducts();
    return getAll;
};

const getProductsById = async (id) => {
    const [getProduct] = await model.getProductsById(id);

    if (!getProduct) throw erroHandler(404, 'Product not found');

    return getProduct;
};

const addProduct = async (name, quantity) => {
    const newProduct = await model.addProduct(name, quantity);
    console.log(newProduct.productsListName);

    if (newProduct.productsListName.find((productName) => productName === name)) {
        throw erroHandler(409, 'Product already exists');
    }
    return newProduct.newProduct;
};

const toUpdateProduct = async (name, quantity, id) => {
    const updatedProduct = await model.toUpdateProduct(name, quantity, id);

    if (!updatedProduct.productsIds.find((ID) => ID === +id)) {
        throw erroHandler(404, 'Product not found');
    }
    return updatedProduct.productUpdated[0];
};

module.exports = {
    getProducts,
    getProductsById,
    addProduct,
    toUpdateProduct,
  };