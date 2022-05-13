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
    const queryLastSale = 'select max(id) as id from StoreManager.sales';
    const [id] = await connection.execute(queryLastSale);

    const newId = (id[0].id) + 1;
    const querySale = 'INSERT INTO StoreManager.sales (id) VALUES (?)';
    await connection.execute(querySale, [newId]);

    const query = `INSERT INTO StoreManager.sales_products
     (sale_id,product_id, quantity) VALUES (?,?,?)`;
    await connection.execute(query, [newId, productId, quantity]);

    const newSaleQuery = `select product_id,
     quantity from StoreManager.sales_products where sale_id=?`;
    const [newSale] = await connection.execute(newSaleQuery, [newId]);
    
    const newSaleToReturn = {
        id: newId,
        ittemsSold: 
            newSale,
        
    };
    console.log(newSale);

    return newSaleToReturn;
};

const toUpdateSale = async (productId, quantity, id) => {
    const query = `UPDATE StoreManager.products SET products.product_id =?,
    products.quantity =? where products.id =?`;

    const updatedSale = await connection.execute(query, [productId, quantity, id]);
    return updatedSale;
};

module.exports = {
    getSales,
    getSalesById,
    addSale,
    toUpdateSale,
  };