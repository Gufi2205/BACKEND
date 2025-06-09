const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');

class AuthController {
    async register(req, res) {
        const { username, password, email } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query(
                'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)',
                [username, hashedPassword, email]
            );
            res.status(201).json({ message: 'Usuario registrado' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
            const user = result.rows[0];
            if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return res.status(400).json({ error: 'Contraseña incorrecta' });

            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = AuthController;