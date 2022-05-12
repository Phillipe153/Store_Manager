const service = require('../services/salesService');

const getSales = async (_req, res) => {
    const allSales = await service.getSales();
    return res.status(200).json(allSales);
  };
  
  const getSalesById = async (req, res) => {
    const { id } = req.params;
    const sale = await service.getSalesById(id);
    return res.status(200).json(sale);
  };

  module.exports = {
    getSales,
    getSalesById,
  };