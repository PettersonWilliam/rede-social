import db from '../models/index.js';

const { PostLike } = db;

export default class PostLikeController {
	// ... outras rotas

	static async toggleLike(req, res) {
		try {
			const user_id = req.userId;
			const post_id = req.params.id;

			let like = await PostLike.findOne({
				where: { user_id, post_id }
			});

			if (like) {
				// Toggle de like
				like.is_deleted = !like.is_deleted;
				like.liked_at = new Date();
				await like.save();
			} else {
				like = await PostLike.create({
					user_id,
					post_id,
					liked_at: new Date(),
					is_deleted: false
				});
			}

			return res.status(200).json({ message: like.is_deleted ? 'Deslike' : 'Like' });
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: 'Erro ao curtir/descurtir o post' });
		}
	}
}
