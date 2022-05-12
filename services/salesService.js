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

module.exports = {
    getSales,
    getSalesById,
  };