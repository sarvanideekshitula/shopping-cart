'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('products', {
			productId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			productName: {
				type: Sequelize.STRING
			},
			price: {
				type: Sequelize.INTEGER
			},
			quantity: {
				type: Sequelize.INTEGER
			},
			imageLink: {
				type: Sequelize.STRING
			},
			category: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('products');
	}
};