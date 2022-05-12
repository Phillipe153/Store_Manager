const model = require('../models/salesModel');

const getSales = async () => {
    const getAll = await model.getSales();
    return getAll;
};

const getSalesById = async (id) => {
    const getSale = await model.getSalesById(id);
    return getSale;
};

module.exports = {
    getSales,
    getSalesById,
  };