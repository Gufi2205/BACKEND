const express = require('express');
const path = require('path');
const app = express();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

// Sirve archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, '../public')));

app.use('/products', productRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/form.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});