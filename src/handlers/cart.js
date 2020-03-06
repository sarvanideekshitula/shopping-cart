const dbOperations = require('../utils/dbOperations');

const addToCart = async (request, h) => {
	try {
		const cartItem = await dbOperations.retrieveCartItem(request.payload.productId);
		const productItem = await dbOperations.retrieveProductById(request.payload.productId);
		const cartQuantity = cartItem ? cartItem.quantity : 0;
		const netQunatity = cartQuantity + 1;
		if (netQunatity > productItem.quantity) { throw new Error('Requested Qunatity greater than total quantity'); }
		if (cartItem) {
			await dbOperations.updateCart(cartItem.id, { quantity: netQunatity, totalPrice: netQunatity * productItem.price });
			return h.response('updated').code(200);
		}
		else {
			await dbOperations.addToCart({ productId: productItem.id, price: productItem.price, quantity: netQunatity, totalPrice: netQunatity * productItem.price });
			return h.response('added').code(200);
		}
	} catch (e) {
		return h.response(e.message).code(500);
	}
};

const removeFromCart = async (request, h) => {
	try {
		const cartItem = await dbOperations.retrieveCartItem(request.payload.productId);
		if (!cartItem) {
			throw new Error('CartItem not found');
		}
		if (cartItem.quantity <= 1) {
			await dbOperations.deleteFromCart(cartItem.id);
			return h.response('deleted').code(200);
		}
		const netQunatity = cartItem.quantity - 1;
		await dbOperations.updateCart(cartItem.id, { quantity: netQunatity, totalPrice: netQunatity * cartItem.price });
		return h.response('updated').code(200);
	} catch (e) {
		return h.response(e.message).code(500);
	}
};

const details = async (request, h) => {
	try {
		const data = await dbOperations.retrieveCart();
		const productDetails = await dbOperations.retrieveProducts(data.map((value) => value.productId));
		const items = data.map((value) => {
			const product = productDetails.find(productObj => productObj.id === value.productId);
			value.product = product;
			return value;
		});
		let totalValue = 0, numberOfItems = 0;
		data.forEach(item => {
			totalValue += item.totalPrice;
			numberOfItems += item.quantity;
		});
		const response = {
			items,
			numberOfItems,
			totalValue
		};
		return h.response(`${JSON.stringify(response)}`).code(200);
	} catch (e) {
		return h.response(e.message).code(500);
	}
};

const checkout = async (request, h) => {
	try{
		const cartItems = await dbOperations.retrieveCart();
		const productDetails = await dbOperations.retrieveProducts(cartItems.map((value) => value.productId));
		const productPromises = [];
		cartItems.forEach((item) => {
			const product = productDetails.find(productObj => productObj.id === item.productId);
			productPromises.push(dbOperations.updateInventory({quantity: product.quantity-item.quantity, productId:product.id}));
		});
		await Promise.all(productPromises);
		await dbOperations.clearCart();
		return h.response('checkout success').code(200);
	}catch(e){
		return h.response(e.message).code(500);
	}
};

const cartCount = async (request, h) => {
	const data = await dbOperations.retrieveCart();
	let numberOfItems = 0;
	data.forEach(item => {
		numberOfItems += item.quantity;
	});
	return h.response(JSON.stringify({count: numberOfItems})).code(200);
};

module.exports = { addToCart, details, removeFromCart, checkout, cartCount };