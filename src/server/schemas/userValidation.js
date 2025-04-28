import * as yup from 'yup';

const userValidation = {
	registerSchema: {
		body: yup.object({
			name: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().min(6).required(),
			confirmPassword: yup.string()
				.oneOf([yup.ref('password')], 'Passwords must match')
				.required()
		}).noUnknown()
	},

	updateSchema: {
		body: yup.object({
			name: yup.string().required(),
			email: yup.string().email().required()
		}).noUnknown()
	}
};

export default userValidation;
