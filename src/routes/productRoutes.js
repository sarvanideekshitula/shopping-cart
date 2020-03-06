const {getAllProducts, getProductsByFilter, getAllCategories} = require('../handlers/products');

const productRoutes = [
	{
		path: '/products',
		method: 'GET',
		handler: getAllProducts,
	},
	{
		path: '/products/category/{categoryName}',
		method: 'GET',
		handler: getProductsByFilter,
	},
	{
		path: '/categories',
		method: 'GET',
		handler: getAllCategories,
	},
];

module.exports = { productRoutes };