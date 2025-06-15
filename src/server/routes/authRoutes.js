import { Router } from 'express';
import AuthController from '../controllers/authController.js';

const setup = () => {
	const router = Router();

	router.post('/', AuthController.store);
	router.put('/', AuthController.updatePassword);

	return router;
};

export default { setup };
