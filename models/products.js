'use strict';
module.exports = (sequelize, DataTypes) => {
	const products = sequelize.define('products', {
		productId: DataTypes.NUMBER,
		productName: DataTypes.STRING,
		price: DataTypes.NUMBER,
		quantity: DataTypes.NUMBER,
		imageLink: DataTypes.STRING,
		category: DataTypes.STRING
	}, {});
	products.associate = function(models) {
		// associations can be defined here
	};
	return products;
};