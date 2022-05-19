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

const deleteProduct = async (id) => {
    console.log('chamou service');
    const findProduct = await model.getProducts();
    // console.log(findProduct);
    
    if (!findProduct.find((ID) => ID.id === +id)) {
        throw erroHandler(404, 'Product not found');
    }
    const productToDelete = await model.deleteProduct(id);
    return productToDelete;
};

module.exports = {
    getProducts,
    getProductsById,
    addProduct,
    toUpdateProduct,
    deleteProduct,    
  };