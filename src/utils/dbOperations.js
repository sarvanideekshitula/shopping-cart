const db = require('../../models/index');

const retriveAllProducts = async () => {
	const products = await db.products.findAll();
	return products;
};

const addProductsToDb = async (data) => {
	const result = await db.products.bulkCreate(data, {fields:['productId', 'productName', 'price', 'quantity', 'imageLink', 'category']});
	console.log(result);
};

module.exports={retriveAllProducts, addProductsToDb};