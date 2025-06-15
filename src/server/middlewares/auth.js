import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) return res.status(401).json({ error: 'Token não enviado' });

	const [type, token] = authHeader.split(' ');

	if (type !== 'Bearer' || !token) {
		return res.status(401).json({ error: 'Token mal formatado' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.id;

		return next();
	} catch (err) {
		return res.status(401).json({ error: 'Token inválido' });
	}
}
