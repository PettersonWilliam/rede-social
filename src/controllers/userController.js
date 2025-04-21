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
}
