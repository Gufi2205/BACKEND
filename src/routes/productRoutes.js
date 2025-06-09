import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from '../controllers/productController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authenticateToken, createProduct);
router.get('/all', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);

export default router;