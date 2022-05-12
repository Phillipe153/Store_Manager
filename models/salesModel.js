const connection = require('./connection');

const getSales = async () => {
    const query = `SELECT sp.*, sa.date FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id
    ORDER BY sale_id, product_id`;
    const [allSales] = await connection.execute(query);
    const allSalesInCamelCaseMode = allSales.map((sale) => ({
        saleId: sale.sale_id,
        date: sale.date,
        productId: sale.product_id,        
        quantity: sale.quantity,
    }));

    return allSalesInCamelCaseMode;
};

const getSalesById = async (id) => {
    const query = `SELECT sp.*, sa.date FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id
    WHERE sale_id=?
    ORDER BY sale_id, product_id`;
    const [sales] = await connection.execute(query, [id]);
    const allSalesInCamelCaseMode = sales.map((sale) => ({
        date: sale.date,
        productId: sale.product_id,        
        quantity: sale.quantity,
    }));

    return allSalesInCamelCaseMode;
};

const addSale = async (productId, quantity) => {
    const query = 'INSERT INTO StoreManager.products (product_id, quantity) VALUES (?,?)';
    const [newProduct] = await connection.execute(query, [productId, quantity]);

    return newProduct;
};

const toUpdateSale = async (productId, quantity, id) => {
    const query = `UPDATE StoreManager.products SET products.product_id =?,
    products.quantity =? where products.id =?`;

    const updatedProduct = await connection.execute(query, [productId, quantity, id]);
    return updatedProduct;
};

module.exports = {
    getSales,
    getSalesById,
    addSale,
    toUpdateSale,
  };