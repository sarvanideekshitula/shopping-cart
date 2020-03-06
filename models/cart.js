'use strict';
module.exports = (sequelize, DataTypes) => {
	const cart = sequelize.define('cart', {
		productId: DataTypes.INTEGER,
		quantity: DataTypes.INTEGER,
		price: DataTypes.INTEGER,
		totalPrice: DataTypes.INTEGER
	}, {});
	cart.associate = function(models) {
		// associations can be defined here
	};
	return cart;
};