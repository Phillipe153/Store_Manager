// Renomeie esse arquivo
const connection = require('./connection');

const getProducts = async () => {
    const query = 'SELECT * FROM StoreManager.products order by id';
    const [allProducts] = await connection.execute(query);

    return allProducts;
};

const getProductsById = async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id=?';
    const [product] = await connection.execute(query, [id]);

    return product;
};

const addProduct = async (name, quantity) => {
    const queryGetProductsName = 'select name from StoreManager.products';
    const [productsName] = await connection.execute(queryGetProductsName);
    const productsListName = productsName.map((nameProduct) => nameProduct.name);

    const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';
    const [newProduct] = await connection.execute(query, [name, quantity]);

    return {
        newProduct,
        productsListName,
    };
};

const toUpdateProduct = async (name, quantity, id) => {
    const query = `UPDATE StoreManager.products SET products.name =?,
    products.quantity =? where products.id =?`;
    await connection.execute(query, [name, quantity, id]);

    const productUpdated = await getProductsById(id);
    const products = await getProducts();
    const productsIds = products.map((ids) => ids.id);
    return {
        productUpdated,
        productsIds,
    };
};

const deleteProduct = async (id) => {
    const query = 'DELETE FROM StoreManager.products WHERE id=?';
    await connection.execute(query, [id]);

    const products = await getProducts();
    const productsIds = products.map((ids) => ids.id);
    // console.log(productsIds);
    return productsIds;
};

module.exports = {
    getProducts,
    getProductsById,
    addProduct,
    toUpdateProduct,
    deleteProduct,
  };