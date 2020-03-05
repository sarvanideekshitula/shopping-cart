'use strict';
module.exports = (sequelize, DataTypes) => {
	const products = sequelize.define('products', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		name: DataTypes.STRING,
		price: DataTypes.INTEGER,
		quantity: DataTypes.INTEGER,
		imageLink: DataTypes.STRING,
		category: DataTypes.STRING
	}, {});
	products.associate = function(models) {
		// associations can be defined here
	};
	return products;
};