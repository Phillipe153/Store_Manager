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
    const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';
    const [newProduct] = await connection.execute(query, [name, quantity]);

    return newProduct;
};

const toUpdateProduct = async (name, quantity, id) => {
    const query = `UPDATE StoreManager.products SET products.name =?,
    products.quantity =? where products.id =?`;

    const updatedProduct = await connection.execute(query, [name, quantity, id]);
    return updatedProduct;
};

module.exports = {
    getProducts,
    getProductsById,
    addProduct,
    toUpdateProduct,
  };