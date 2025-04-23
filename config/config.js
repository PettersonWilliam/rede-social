import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: 'postgres',
		migrationStorage: 'sequelize',
		migrationStorageTableName: 'sequelize_meta',
		seederStorage: 'sequelize',
		define: {
			underscored: true,
			timestamps: true,
			freezeTableName: true
		}
	}
};
