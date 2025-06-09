import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
});

// Agrega esto para depurar el usuario conectado
pool.query('SELECT current_user', [], (err, res) => {
    if (err) {
        console.error('Error al obtener el usuario actual:', err);
    } else {
        console.log('Usuario conectado a PostgreSQL:', res.rows[0].current_user);
    }
});

export const query = (text, params) => pool.query(text, params);
export { pool };