
const db = require('../db');


exports.createProduct = async (req, res) => {
  const { name, description, quantity, status } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO products (name, description, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, quantity, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Aquí puedes agregar más funciones como updateProduct, getAllProducts, etc.

