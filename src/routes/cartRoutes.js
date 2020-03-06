const { addToCart, details, removeFromCart, checkout, cartCount } = require('../handlers/cart');

const cartRoutes = [
	{
		path: '/cart/add-to-cart',
		method: 'POST',
		handler: addToCart,
	},
	{
		path: '/cart/remove',
		method: 'POST',
		handler: removeFromCart,
	},
	{
		path: '/cart/details',
		method: 'GET',
		handler: details,
	},
	{
		path: '/cart/checkout',
		method: 'POST',
		handler: checkout,
	},
	{
		path: '/cart/count',
		method: 'GET',
		handler: cartCount,
	},
];

module.exports = { cartRoutes };