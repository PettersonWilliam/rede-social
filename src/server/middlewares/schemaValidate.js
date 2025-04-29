export default {
	validate: schema => async (req, res, next) => {
		try {
			await schema.body.validate(req.body, { abortEarly: false });
			return next();
		} catch (err) {
			return res.status(400).json({ error: err.errors });
		}
	}
};
