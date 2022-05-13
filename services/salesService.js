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

const addSale = async (teste) => {
  const newProduct = await model.addSale(teste);
  // teste.map(async (e) => {
    //   await addSale(e);
    // });
    const allSalesInCamelCaseMode = newProduct.newSale.map((sale) => ({
      productId: sale.product_id,        
      quantity: sale.quantity,
    }));
    
    console.log(allSalesInCamelCaseMode);
  const newSaleToReturn = {
    id: newProduct.newId,
    itemsSold: 
    allSalesInCamelCaseMode,        
};
  
  return newSaleToReturn;
};

const toUpdateSale = async (productId, quantity, id) => {
  const getSale = await model.getSalesById(id);

  if (getSale.length === 0) throw erroHandler(404, 'Sale not found');

  const [updatedProduct] = await model.toUpdateSale(productId, quantity, id);
  return updatedProduct;
};

module.exports = {
    getSales,
    getSalesById,
    addSale,
    toUpdateSale,
    
  };