import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ error: 'Token não enviado' });
	}

	const [, token] = authHeader.split(' '); // Bearer <token>

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.userId = decoded.id;

		return next();
	} catch (err) {
		return res.status(401).json({ error: 'Token inválido' });
	}
}

