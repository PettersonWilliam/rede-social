import { Router } from 'express';
import schemaValidate from '../middlewares/schemaValidate.js';
import userValidation from '../schemas/userValidation.js';
import UserController from '../controllers/userController.js';

const setup = () => {
	const router = Router();

	router.post('/', schemaValidate.validate(userValidation.registerSchema), UserController.createUser);
	router.get('/', UserController.getAllUsers);
	router.get('/:id', UserController.getUserId);
	router.put('/:id', schemaValidate.validate(userValidation.updateSchema), UserController.updateUser);
	router.delete('/:id', UserController.deleteUser);

	return router;
};

export default { setup };
