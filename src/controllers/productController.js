import * as db from '../db/index.js';

export const createProduct = async (req, res) => {
  const { name, description, quantity, status } = req.body;
  const userId = req.user.id; // <-- Aquí obtienes el ID del usuario autenticado
  try {
    // Obtener el siguiente valor de la secuencia
    const seqResult = await db.query("SELECT nextval('product_id_seq') as seq");
    const seq = seqResult.rows[0].seq;
    const customId = `PRODUC${seq.toString().padStart(3, '0')}`;

    const result = await db.query(
      'INSERT INTO products (id, name, description, quantity, status, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [customId, name, description, quantity, status, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity, status } = req.body;
  try {
    const result = await db.query(
      'UPDATE products SET name = $1, description = $2, quantity = $3, status = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
      [name, description, quantity, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

