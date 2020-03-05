const {getAllProducts} = require('../handlers/products');

const productRoutes = [
	{
		path: '/products',
		method: 'GET',
		handler: getAllProducts,
	},
];

module.exports = { productRoutes };