const connection = require('./connection');

const getSales = async () => {
    const query = `SELECT sp.*, sa.date FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id
    ORDER BY sale_id, product_id`;
    const [allSales] = await connection.execute(query);
    const allSalesInCamelCaseMode = allSales.map((sale) => ({
        productId: sale.product_id,        
        saleId: sale.sale_id,
        quantity: sale.quantity,
        date: sale.date,
    }));
    console.log(allSalesInCamelCaseMode);

    return allSalesInCamelCaseMode;
};

const getSalesById = async (id) => {
    const query = 'SELECT * FROM StoreManager.sales_products WHERE sale_id=?';
    const [sale] = await connection.execute(query, [id]);

    return sale;
};

module.exports = {
    getSales,
    getSalesById,
  };