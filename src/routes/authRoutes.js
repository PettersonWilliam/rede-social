import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import auth from '../middlewares/auth.js'; // importa o middleware

const router = Router();

// login (public)
router.post('/', AuthController.store);

// atualizar senha (privado)
router.put('/update-password', auth, AuthController.updatePassword);

export default router;
