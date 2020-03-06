const db = require('../../models/index');

const retriveAllProducts = async () => {
	const products = await db.products.findAll();
	return products;
};

const retrieveProductById = async (productId) => {
	const product = await db.products.findOne({ where: { id: productId } });	
	return JSON.parse(JSON.stringify(product));
};

const retrieveProducts = async (productIds) => {
	const products = await db.products.findAll({ where: { id: productIds } });
	return JSON.parse(JSON.stringify(products));
};

const retriveByFilter = async (filter) => {
	const products = await db.products.findAll({ where: { category: filter } });
	return products;
};

const retriveAllCategories = async () => {
	const categories = await db.products.aggregate('category', 'DISTINCT', { plain: false });
	return categories.map(x=>x.DISTINCT);
};

const addProductsToDb = async (data) => {
	await db.products.bulkCreate(data, { fields: ['id', 'name', 'price', 'quantity', 'imageLink', 'category'] });
};

const updateInventory = async (data) => {
	await db.products.update({ quantity: data.quantity }, {where: {id: data.productId}  });
};

const addToCart = async (data) => {
	const cartItem = await db.cart.create(data);
	return cartItem;
};

const retrieveCartItem = async (productId) => {
	const cartItem = await db.cart.findOne({ where: { productId: productId } });
	return JSON.parse(JSON.stringify(cartItem));
};

const retrieveCart = async () => {
	const cart = await db.cart.findAll();
	return JSON.parse(JSON.stringify(cart));
};

const updateCart = async (id, data) => {
	const cartItem = await db.cart.update({ quantity: data.quantity, totalPrice: data.totalPrice }, {where: {id: id}  });
	return cartItem;
};

const deleteFromCart = async (cartItemId) => {
	const cartItem = await db.cart.destroy({where: { id: cartItemId }});
	return cartItem;
};

const clearCart = async () => {
	const cartItem = await db.cart.destroy({truncate: true});
	return cartItem;
};

module.exports = { retriveAllProducts, retrieveProducts, retrieveProductById, retriveByFilter, retriveAllCategories, addProductsToDb, updateInventory, retrieveCart, retrieveCartItem, addToCart, updateCart, deleteFromCart, clearCart };