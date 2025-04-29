import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './userModel.js';
import PostModel from './postModel.js';

dotenv.config();

const databaseConnection = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'postgres',
		logging: false
	}
);

const User = UserModel(databaseConnection, Sequelize.DataTypes);
const Post = PostModel(databaseConnection, Sequelize.DataTypes);

User.associate?.({ Post });
Post.associate?.({ User });

export default {
	databaseConnection,
	Sequelize,
	User,
	Post
};
