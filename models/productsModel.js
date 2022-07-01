const connection = require('./connection');

const db = connection;

const productsModel = {
  getAll: async () => {
    const sql = ('SELECT * FROM products ORDER BY id ASC;');
    const [products] = await db.query(sql);
    return products;
  },

  getById: async (id) => {
    const sql = ('SELECT * FROM products Where id = ?;');
    const [[products]] = await db.query(sql, [id]);
    return products;
  },

  checkIfExists: async (id) => {
    const sql = 'SELECT * FROM products Where id = ?;';
    const [[exists]] = await db.query(sql, [id]);
    return !!exists;
  },

  post: async (name) => {
    const sql = 'INSERT INTO products (name) VALUES(?)';
    const [{ insertId }] = await db.query(sql, [name]);
    return insertId;
  },

  put: async (obj) => {
    const { name, id } = obj;
    const sql = 'UPDATE products SET name = ? WHERE id = ?';
    const [{ affectedRows }] = await db.query(sql, [name, id]);
    return affectedRows;
  },

  delete: async (id) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    const [{ affectedRows }] = await db.query(sql, [id]);
    return affectedRows;
  },

  searchTerm: async (search) => {
    const sintax = `%${search}%`;
    const sql = 'SELECT * FROM products WHERE name LIKE ?';

    const [searchResult] = await db.query(sql, [sintax]);
    return searchResult;
  },
};

module.exports = productsModel;