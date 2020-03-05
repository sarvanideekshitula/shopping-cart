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
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('products');
	}
};