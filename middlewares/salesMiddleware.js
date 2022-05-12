const service = require('../services/salesService');

const validateSales = async (req, res, next) => {
  const { id } = req.params;
  const salesId = await service.getSalesById(id);
  if (!salesId) return { message: 'Sale not found' };

  next();
};

module.exports = {
  validateSales,
};