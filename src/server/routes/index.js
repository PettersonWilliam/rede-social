import { Router } from 'express';
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

router.use('/users', userRoutes.setup());
router.use('/posts', postRoutes.setup());
router.use('/authentication', authRoutes.setup());

export default router;
