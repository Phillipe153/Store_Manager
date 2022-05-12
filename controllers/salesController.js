const service = require('../services/salesService');

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

  module.exports = {
    getSales,
    getSalesById,
  };