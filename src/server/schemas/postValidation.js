import * as yup from 'yup';

const postValidation = {
	createSchema: {
		body: yup.object({
			user_id: yup.number().integer().required(),
			title: yup.string().required(),
			summary: yup.string().required(),
			text: yup.string().required(),
			available_at: yup.date().required()
		}).noUnknown()
	},

	updateSchema: {
		body: yup.object({
			title: yup.string().required(),
			summary: yup.string().required(),
			text: yup.string().required(),
			available_at: yup.date().required()
		}).noUnknown()
	}
};

export default postValidation;
