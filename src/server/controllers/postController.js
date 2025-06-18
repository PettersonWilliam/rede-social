import db from '../models/index.js';
const { Post } = db;


export default class PostController {
	static async createPost(req, res) {
		try {
			const { title, summary, text, available_at } = req.body;

			const post = await Post.create({
				user_id: req.userId,
				title,
				summary,
				text,
				available_at
			});

			return res.status(201).json(post);
		} catch (err) {
			return res.status(500).json({ error: 'Erro ao criar post' });
		}
	}

	static async getAllPosts(req, res) {
		try {
			const posts = await Post.findAll();

			return res.status(200).json(posts);
		} catch (err) {
			return res.status(500).json({ error: 'Erro ao buscar posts' });
		}
	}

	static async getPostById(req, res) {
		try {
			const { id } = req.params;
			const post = await Post.findByPk(id);

			if (!post) {
				return res.status(404).json({ error: 'Post não encontrado' });
			}

			return res.status(200).json(post);
		} catch (err) {
			return res.status(500).json({ error: 'Erro ao buscar post' });
		}
	}

	static async updatePost(req, res) {
		try {
			const { id } = req.params;
			const { title, summary, text, available_at } = req.body;

			const post = await Post.findOne({
				where: { id }
			});

			if (!post) {
				return res.status(404).json({ error: 'Post não encontrado' });
			}

			if (post.user_id !== req.userId) {
				return res.status(403).json({ error: 'Você não tem permissão para editar este post' });
			}

			await post.update({
				title: title || post.title,
				summary: summary || post.summary,
				text: text || post.text,
				available_at: available_at || post.available_at
			});

			return res.status(200).json(post);
		} catch (err) {
			return res.status(500).json({ error: 'Erro ao atualizar post' });
		}
	}

	static async deletePost(req, res) {
		try {
			const { id } = req.params;
			const post = await Post.findByPk(id);

			if (!post) {
				return res.status(404).json({ error: 'Post não encontrado' });
			}

			if (post.user_id !== req.userId) {
				return res.status(403).json({ error: 'Você não tem permissão para deletar este post' });
			}

			await post.destroy();

			return res.status(200).json({ message: 'Post deletado com sucesso' });
		} catch (err) {
			return res.status(500).json({ error: 'Erro ao deletar post' });
		}
	}
}
