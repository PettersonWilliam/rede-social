import { Router } from 'express';
import schemaValidate from '../middlewares/schemaValidate.js';
import postValidation from '../schemas/postValidation.js';
import PostController from '../controllers/postController.js';

const setup = () => {
	const router = Router();

	router.post('/', schemaValidate.validate(postValidation.createSchema), PostController.createPost);
	router.get('/', PostController.getAllPosts);
	router.get('/:id', PostController.getPostById);
	router.put('/:id', schemaValidate.validate(postValidation.updateSchema), PostController.updatePost);
	router.delete('/:id', PostController.deletePost);

	return router;
};

export default { setup };
