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
      const teste = req.body;
      const newsale = await service.addSale(teste);
      console.log(newsale);
      return res.status(201).json(newsale);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };
  
  const putSale = async (req, res) => {
    try {
      const { id } = req.params;
      const teste = req.body;
    
      const updatedSale = await service.toUpdateSale(teste, id);
      return res.status(OK).json(updatedSale);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  }; 

  const deleteSale = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      await service.deleteSale(id);
      return res.status(204).json({});
    } catch (err) {
      console.log('chmaou err');
      return res.status(err.status).json({ message: err.message });
    }
  };
  
  module.exports = {
    getSales,
    getSalesById,
    postSale,
    putSale,
    deleteSale,
  };