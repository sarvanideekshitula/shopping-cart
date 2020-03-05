const dbOperations = require('../utils/dbOperations');
const externalAPIFetch = require('../utils/externalAPIFetch');

const getAllProducts = async (request, h) => {
	try {
		let products = [];
		products = await dbOperations.retriveAllProducts();
		if (!Array.isArray(products) || !products.length) {
			const productsFromAPI = await externalAPIFetch.fetchAllProducts();
			const productData = productsFromAPI.data;
			const categoryFetchPromise = [];
			productData.forEach((product) => {
				categoryFetchPromise.push(externalAPIFetch.fetchCategory(product.id));
			});

			const productCategories = await Promise.all(categoryFetchPromise);
			productData.forEach(product => {
				const category = productCategories.find(productCategory => productCategory.productId === product.id);
				console.log(category);
				product.category = category.category;
			});
			await dbOperations.addProductsToDb(productData);
			products = await dbOperations.retriveAllProducts();
		}
		return h.response(`${JSON.stringify(products)}`).code(200);
	}
	catch (error) {
		return h.response(error.message).code(500);
	}
};

module.exports = { getAllProducts };