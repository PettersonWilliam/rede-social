'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('posts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: { model: 'users', key: 'id' },
				onDelete: 'CASCADE'
			},
			title: {
				type: Sequelize.STRING
			},
			summary: {
				type: Sequelize.STRING
			},
			text: {
				type: Sequelize.TEXT
			},
			available_at: {
				type: Sequelize.DATE
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deleted_at: {
				type: Sequelize.DATE
			}
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('posts');
	}
};
