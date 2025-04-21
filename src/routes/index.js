import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js'; // caso tenha também

const routes = Router();

routes.use('/authentication', authRoutes);
routes.use('/user', userRoutes);

export default routes;
