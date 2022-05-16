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
    
  const newSaleToReturn = {
    id: newProduct.newId,
    itemsSold: 
    allSalesInCamelCaseMode,        
};
  
  return newSaleToReturn;
};

const toUpdateSale = async (teste, id) => {
  const getSale = await model.getSalesById(id);

    if (getSale.length === 0) throw erroHandler(404, 'Sale not found');

  const [updatedProduct] = await model.toUpdateSale(teste, id);
  
  const allSalesInCamelCaseMode = {
    productId: updatedProduct.product_id,        
    quantity: updatedProduct.quantity,
  };
  console.log(updatedProduct);
  
  const updatedSaleToReturn = {
    saleId: updatedProduct.sale_id,
    itemUpdated: 
    [allSalesInCamelCaseMode],        
};
  return updatedSaleToReturn;
};

const deleteSale = async (id) => {
  const findSale = await model.getSales();
  console.log(findSale);
  
  if (!findSale.find((ID) => ID.saleId === +id)) {
      throw erroHandler(404, 'Sale not found');
  }
  const productToDelete = await model.deleteSale(id);
  return productToDelete;
};

module.exports = {
    getSales,
    getSalesById,
    addSale,
    toUpdateSale,
    deleteSale,
    
  };