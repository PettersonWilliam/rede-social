import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './userModel.js';
import PostModel from './postModel.js';

dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'postgres',
		logging: false
	}
);

const User = UserModel(sequelize, Sequelize.DataTypes);
const Post = PostModel(sequelize, Sequelize.DataTypes);

User.associate?.({ Post });
Post.associate?.({ User });

export default {
	sequelize,
	Sequelize,
	User,
	Post
};
