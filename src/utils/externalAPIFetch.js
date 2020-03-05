const axios = require('axios').default;
const productAPI = require('../constants/apis');

const fetchAllProducts = async () => {
	const products = await axios.get(productAPI);
	return products;
};

const fetchCategory = async (productId) => {
	const category = await axios.get(`${productAPI}/${productId}/category`);	
	return { productId: productId, category: category.data.category };
};

module.exports = { fetchAllProducts, fetchCategory };