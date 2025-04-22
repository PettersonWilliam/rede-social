import db from '../../models/index.js';
import { registerSchema } from '../schemas/userValidation.js';
import bcrypt from 'bcryptjs';

const User = db.User;

export default class UserController {
	static async createUser(req, res) {
		try {
			await registerSchema.validate(req.body, { abortEarly: false });

			const { name, email, password } = req.body;

			const userExists = await User.findOne({ where: { email } });

			if (userExists) {
				return res.status(400).json({ error: 'E-mail já cadastrado' });
			}

			const hashedPassword = await bcrypt.hash(password, 8);

			const user = await User.create({
				name,
				email,
				password: hashedPassword
			});

			return res.status(201).json({
				id: user.id,
				name: user.name,
				email: user.email
			});

		} catch (err) {
			if (err.name === 'ValidationError') {
				return res.status(400).json({ errors: err.errors });
			}

			console.error(err);
			return res.status(500).json({ error: 'Erro ao criar usuário' });
		}
	}

	static async getAllUsers(req, res) {
		try {
			const users = await User.findAll({
				attributes: ['id', 'name', 'email']
			});

			return res.status(200).json(users);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: 'Erro ao buscar usuários' });
		}
	}

	static async getUserId(req, res) {
		try {
			const { id } = req.params; // Correto: agora extrai 'id' da rota
	
			const user = await User.findOne({
				where: { id },
				attributes: ['id', 'name', 'email']
			});
	
			if (!user) {
				return res.status(404).json({ error: 'Usuário não encontrado' });
			}
	
			return res.status(200).json(user);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: 'Erro ao buscar usuário' });
		}
	}

	static async updateUser(req, res) {
		try {
			const { id } = req.params;
			const { name, email } = req.body;
	
			const user = await User.findByPk(id);
	
			if (!user) {
				return res.status(404).json({ error: 'Usuário não encontrado' });
			}
	
			user.name = name || user.name;
			user.email = email || user.email;
	
			await user.save();
	
			return res.status(200).json({
				id: user.id,
				name: user.name,
				email: user.email,
				message: 'Usuário atualizado com sucesso'
			});
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: 'Erro ao atualizar usuário' });
		}
	}	

	static async deleteUser(req, res) {
		try {
			const { id } = req.params;
	
			const user = await User.findByPk(id);
	
			if (!user) {
				return res.status(404).json({ error: 'Usuário não encontrado' });
			}
	
			await user.destroy();
	
			return res.status(200).json({ message: 'Usuário deletado com sucesso' });
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: 'Erro ao deletar usuário' });
		}
	}
}
