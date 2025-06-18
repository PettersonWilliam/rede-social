import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';

const User = db.User;

export default class AuthController {
	static async store(req, res) {
		try {
			const loginSchema = yup.object().shape({
				email: yup.string().email().required(),
				password: yup.string().required()
			});

			await loginSchema.validate(req.body, { abortEarly: false });

			const { email, password } = req.body;

			const user = await User.findOne({ where: { email } });

			if (!user) {
				return res.status(401).json({ error: 'Credenciais inválidas (usuário)' });
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				return res.status(401).json({ error: 'Credenciais inválidas (senha)' });
			}

			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: '30d'
			});

			return res.status(200).json({
				user: {
					id: user.id,
					name: user.name,
					email: user.email
				},
				token
			});

		} catch (err) {
			if (err.name === 'ValidationError') {
				return res.status(400).json({ errors: err.errors });
			}

			console.error(err);
			return res.status(500).json({ error: 'Erro ao autenticar' });
		}
	}

	static async updatePassword(req, res) {
		try {
			const { password } = req.body;
			const userId = req.userId;

			const user = await User.findByPk(userId);

			if (!user) {
				return res.status(404).json({ error: 'Usuário não encontrado' });
			}

			const hashedPassword = await bcrypt.hash(password, 8);

			await User.update({ password: hashedPassword }, { where: { id: userId } });

			return res.status(200).json({ message: 'Senha atualizada com sucesso!' });

		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: 'Erro ao atualizar senha' });
		}
	}
}
