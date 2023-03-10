const connection = require('./connection');
const model = require('./productsModel');

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

const addSale = async (teste) => {
    const queryLastSale = 'select max(id) as id from StoreManager.sales';
    const [id] = await connection.execute(queryLastSale);

    const newId = (id[0].id) + 1;
    const querySale = 'INSERT INTO StoreManager.sales (id) VALUES (?)';
    await connection.execute(querySale, [newId]);

    const query = `INSERT INTO StoreManager.sales_products
     (sale_id,product_id, quantity) VALUES (?,?,?)`;
    const promises = teste.map((e) => connection.execute(query, [newId, e.productId, e.quantity]));
   
    const [currPoductQuant] = await model.getProductsById(teste[0].productId);
    console.log(currPoductQuant.quantity);
    const queryUpdateProductQuantity = 'UPDATE StoreManager.products SET products.quantity=?';
    const productQuantity = connection
    .execute(queryUpdateProductQuantity, [teste[0].quantity]);

    await Promise.all(promises, productQuantity);

    const newSaleQuery = `select product_id,
     quantity from StoreManager.sales_products where sale_id=?  order by product_id`;
    const [newSale] = await connection.execute(newSaleQuery, [newId]);
    
    return { newId, newSale };
};

const toUpdateSale = async (teste, id) => {
    const query = `UPDATE StoreManager.sales_products SET sales_products.product_id =?,
    sales_products.quantity =? WHERE sales_products.sale_id =? AND sales_products.product_id=?`;
    await connection
    .execute(query, [teste[0].productId, teste[0].quantity, id, teste[0].productId]);

    const [currPoductQuant] = await model.getProductsById(teste[0].productId);
    console.log(currPoductQuant.quantity);
    const queryUpdateProductQuantity = 'UPDATE StoreManager.products SET products.quantity=?';
    await connection
    .execute(queryUpdateProductQuantity, [currPoductQuant.quantity + teste[0].quantity]);

    const queryUpdatesProducts = `SELECT sp.*, sa.date FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id
    WHERE sale_id =? AND product_id=?`;
    const [updatesProductsToReturn] = await connection
    .execute(queryUpdatesProducts, [id, teste[0].productId]);
    console.log(updatesProductsToReturn);
    return updatesProductsToReturn;
};

const deleteSale = async (id) => {
    const salesId = await getSalesById(id);
    const productId = salesId.map((e) => ({ id: e.productId, quant: e.quantity }));
    
    productId.forEach(async (e) => {
        console.log(e);
       const [quantityById] = await model.getProductsById(e.id);
        const queryUpdateProductQuantity = `UPDATE StoreManager.products SET products.quantity=?
        where id=?`;
        connection
        .execute(queryUpdateProductQuantity, [quantityById.quantity + e.quant, e.id]);
    });
    
    const query = 'DELETE FROM StoreManager.sales_products WHERE sale_id=?';
    await connection.execute(query, [id]);

    const Sales = await getSales();
    const SalesIds = Sales.map((ids) => ids.sale_id);
    return SalesIds;
};

module.exports = {
    getSales,
    getSalesById,
    addSale,
    toUpdateSale,
    deleteSale,
  };