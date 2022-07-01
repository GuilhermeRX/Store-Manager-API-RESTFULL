const db = require('./connection');

const salesModel = {
  post: async (array) => {
    const salesSql = 'INSERT INTO sales () VALUES ();';
    const [{ insertId }] = await db.query(salesSql);
    const prop = 'sale_id';
    const newArray = array.map((obj) => ({ ...obj, [prop]: insertId }));

    const values = newArray.map((obj) =>
      `(${obj.sale_id}, ${obj.productId}, ${obj.quantity})`).join(', ');

    const salesProductsSql = `INSERT INTO sales_products 
    (sale_id, product_id, quantity) VALUES ${values}`;

    await db.query(salesProductsSql);
    return insertId;
  },

  getAll: async () => {
    const sql = `
      SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity AS quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sale_id;
    `;
    const [sales] = await db.query(sql);
    return sales;
  },

  getById: async (id) => {
    const sql = `SELECT  s.date, sp.product_id AS productId, sp.quantity AS quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sale_id
      WHERE s.id = ?;`;
    const [sales] = await db.query(sql, [id]);
    return sales;
  },

  checkSalesExist: async (id) => {
    const sql = 'SELECT * from sales WHERE id = ?';
    const [[exist]] = await db.query(sql, [id]);
    return !!exist;
  },

  delete: async (id) => {
    const sql = 'DELETE FROM sales WHERE id = ?';
    const [{ affectedRows }] = await db.query(sql, [id]);
    return affectedRows;
  },

  put: async (array, id) => {
    const promises = await Promise.all(array.map(async (obj) => {
      const sql = `UPDATE sales_products 
      SET product_id = ?, quantity = ?  WHERE sale_id = ? AND product_id = ?`;
      const [{ affectedRows }] = await db
        .query(sql, [obj.productId, obj.quantity, id, obj.productId]);
      return affectedRows;
    }));
    return promises;
  },
};

module.exports = salesModel;