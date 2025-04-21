import { Router } from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/authentication', authRoutes);

export default routes;
