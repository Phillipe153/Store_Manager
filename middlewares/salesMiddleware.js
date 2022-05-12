const service = require('../services/salesService');

const validateSales = async (req, res, next) => {
  const { id } = req.params;
  const salesId = await service.getSalesById(id);
  if (salesId.length === 0) return res.status(404).json({ message: 'Sale not found' });

  next();
};

module.exports = {
  validateSales,
};