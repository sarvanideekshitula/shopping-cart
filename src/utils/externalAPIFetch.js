const axios = require('axios').default;
const productAPI = require('../constants/apis');

const fetchAllProducts = () => {
	const products = axios.get(productAPI);
	return products;
};

const fetchCategory = (productId) => {
	const category = axios.get(`${productAPI}/${productId}/category`);
	return category;
};

module.exports = {fetchAllProducts, fetchCategory};