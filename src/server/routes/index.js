import { Router } from 'express';
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';

const router = Router();

router.use('/users', userRoutes.setup());
router.use('/posts', postRoutes.setup());

export default router;
