const model = require('../models/salesModel');

const getSales = async () => {
    const getAll = await model.getSales();
    return getAll;
};

const erroHandler = (status, message) => ({
    status,
    message,
  });

const getSalesById = async (id) => {
    const getSale = await model.getSalesById(id);

    if (getSale.length === 0) throw erroHandler(404, 'Sale not found');
    return getSale;
};

const addSale = async (productId, quantity) => {
  const newProduct = await model.addProduct(productId, quantity);
  return newProduct;
};

const toUpdateSale = async (productId, quantity, id) => {
  const getSale = await model.getSalesById(id);

  if (getSale.length === 0) throw erroHandler(404, 'Sale not found');

  const [updatedProduct] = await model.toUpdateProduct(productId, quantity, id);
  return updatedProduct;
};

module.exports = {
    getSales,
    getSalesById,
    addSale,
    toUpdateSale,
    
  };