'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Posts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER
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
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
  	async down(queryInterface) {
   		await queryInterface.dropTable('Posts');
  	}
};
