'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.renameColumn('products', 'productId', 'id'),
			queryInterface.renameColumn('products', 'productName', 'name'),
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.renameColumn('products', 'id', 'productId'),
			queryInterface.renameColumn('products', 'name', 'productName'),
		]);
	}
};
