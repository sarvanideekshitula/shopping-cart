const db = require('../../models/index');

const retriveAllProducts = async () => {
	const products = await db.products.findAll();
	return products;
};

const addProductsToDb = async (data) => {
	await db.products.bulkCreate(data, {fields:['id', 'name', 'price', 'quantity', 'imageLink', 'category']});
};

module.exports={retriveAllProducts, addProductsToDb};