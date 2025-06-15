import { Router } from 'express';
import schemaValidate from '../middlewares/schemaValidate.js';
import postValidation from '../schemas/postValidation.js';
import PostController from '../controllers/postController.js';
import auth from '../middlewares/auth.js';  // importa o middleware

const setup = () => {
	const router = Router();

	router.post('/', auth, schemaValidate.validate(postValidation.createSchema), PostController.createPost);
	router.get('/', PostController.getAllPosts);
	router.get('/:id', PostController.getPostById);
	router.put('/:id', auth, schemaValidate.validate(postValidation.updateSchema), PostController.updatePost);
	router.delete('/:id', auth, PostController.deletePost);

	return router;
};

export default { setup };
