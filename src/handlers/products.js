const dbOperations = require('../utils/dbOperations');
const externalAPIFetch = require('../utils/externalAPIFetch');
// const {getCategory} = require('../helpers/getCategory');
const getAllProducts = async(request, h) => {
	try{
		let products = [];
		products = await dbOperations.retriveAllProducts();
		if(!Array.isArray(products) || !products.length){
			const productsFromAPI = await externalAPIFetch.fetchAllProducts();
			const productData = productsFromAPI.data;
			products.map(async(product) => {
				const categoryFetch = await externalAPIFetch.fetchCategory(product.id);
				console.log(categoryFetch.data.category);
			});
			await dbOperations.addProductsToDb(productData);
			products = await dbOperations.retriveAllProducts();
		}
		return h.response(`${JSON.stringify(products)}`).code(200);
	}
	catch(error){
		return h.response(error.message).code(500);
	}
};

module.exports = {getAllProducts};