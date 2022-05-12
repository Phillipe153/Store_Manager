const service = require('../services/salesService');

const OK = 200;

const getSales = async (_req, res) => {
    const allSales = await service.getSales();
    return res.status(200).json(allSales);
  };
  
  const getSalesById = async (req, res) => {
    try {
      const { id } = req.params;
      const sale = await service.getSalesById(id);
      return res.status(200).json(sale);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  const postSale = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const newsale = await service.addProduct(productId, quantity);
      return res.status(201).json(newsale);
    } catch (err) {
      console.log('err');
      return res.status(err.status).json({ message: err.message });
    }
  };
  
  const putSale = async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body;
  
    const updatedProduct = service.toUpdateProduct(productId, quantity, id);
    return res.status(OK).json(updatedProduct);
  }; 

  module.exports = {
    getSales,
    getSalesById,
    postSale,
    putSale,
  };