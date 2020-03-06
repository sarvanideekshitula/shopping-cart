const dbOperations = require('../../src/utils/dbOperations');
const db = require('../../models/index');
const uuid = require('uuid');
describe('The retriveAllProducts function', () => {
	it('should retrive all the products when db fetch operation is successful', async(done) => {
		const mockFindAllProducts = jest.spyOn(db.products, 'findAll');
		const products = [
			{
				productId: 1,
				productName : 'Apple - 1kg',
				price: 210,
				quantity: 10,
				imageLink: 'https://techunic-eval4.s3.amazonaws.com/apple.jpg',
				category: 'fruits',
			},
			{
				productId: 2,
				productName: 'Oranges - 1kg',
				price: 300,
				quantity: 10,
				imageLink: 'https://techunic-eval4.s3.amazonaws.com/oranges.jpg',
				category: 'fruits',
			}
		];
		mockFindAllProducts.mockResolvedValue(products);
		const result = await dbOperations.retriveAllProducts();
		expect(result).toBe(products);
		mockFindAllProducts.mockRestore();
		done();
	});
	it('should throw an error if the db fetch operation fails', async (done) => {
		const mockFindAllProducts = jest.spyOn(db.products, 'findAll');
		mockFindAllProducts.mockRejectedValue(new Error('Error occurred in retriving products from db'));
		try {
			await dbOperations.retriveAllProducts();
		} catch (error) {
			expect(error.message).toBe('Error occurred in retriving products from db');
		}
		mockFindAllProducts.mockRestore();
		done();
	});
});
describe('The addProductsToDb function', () => {
	const data = [
		{
			productId: uuid(),
			productName : 'Apple - 1kg',
			price: 210,
			quantity: 10,
			imageLink: 'https://techunic-eval4.s3.amazonaws.com/apple.jpg',
			category: 'fruits',
		},
		{
			productId: uuid(),
			productName: 'Oranges - 1kg',
			price: 300,
			quantity: 10,
			imageLink: 'https://techunic-eval4.s3.amazonaws.com/oranges.jpg',
			category: 'fruits',
		}
	];
	it('should insert the data into db when db create operation is successful', async(done) => {
		const mockAddProducts = jest.spyOn(db.products, 'bulkCreate');
		mockAddProducts.mockResolvedValue();
		await dbOperations.addProductsToDb(data);
		expect(mockAddProducts).toHaveBeenCalled();
		mockAddProducts.mockRestore();
		done();
	});
	it('should throw an error if the db fetch operation fails', async (done) => {
		const mockAddProducts = jest.spyOn(db.products, 'bulkCreate');
		mockAddProducts.mockResolvedValue();
		mockAddProducts.mockRejectedValue(new Error('Error occurred in adding products to db'));
		try {
			await dbOperations.addProductsToDb(data);
		} catch (error) {
			expect(error.message).toBe('Error occurred in adding products to db');
		}
		mockAddProducts.mockRestore();
		done();
	});
});

describe('The retrieveProductById function', () => {
	const data = 
		{
			id: 1,
			name : 'Apple - 1kg',
			price: 210,
			quantity: 10,
			imageLink: 'https://techunic-eval4.s3.amazonaws.com/apple.jpg',
			category: 'fruits',
		};
	it('should return product with given id when db read operation is successful', async(done) => {
		const mockAddProducts = jest.spyOn(db.products, 'findOne');
		mockAddProducts.mockResolvedValue(data);
		await dbOperations.retrieveProductById(1);
		expect(mockAddProducts).toHaveBeenCalled();
		mockAddProducts.mockRestore();
		done();
	});
	it('should throw an error if the db fetch operation fails', async (done) => {
		const mockAddProducts = jest.spyOn(db.products, 'findOne');
		mockAddProducts.mockResolvedValue();
		mockAddProducts.mockRejectedValue(new Error('Error occurred'));
		try {
			await dbOperations.retrieveProductById(data);
		} catch (error) {
			expect(error.message).toBe('Error occurred');
		}
		mockAddProducts.mockRestore();
		done();
	});
});

describe('The retrieveProducts function', () => {
	const data = [
		{
			id: 1,
			name : 'Apple - 1kg',
			price: 210,
			quantity: 10,
			imageLink: 'https://techunic-eval4.s3.amazonaws.com/apple.jpg',
			category: 'fruits',
		},
		{
			id: 2,
			name : 'Apple - 1kg',
			price: 210,
			quantity: 10,
			imageLink: 'https://techunic-eval4.s3.amazonaws.com/apple.jpg',
			category: 'fruits',
		}
	];
		
	it('should return product with given ids when db read operation is successful', async(done) => {
		const mockAddProducts = jest.spyOn(db.products, 'findAll');
		mockAddProducts.mockResolvedValue(data);
		await dbOperations.retrieveProducts([1,2]);
		expect(mockAddProducts).toHaveBeenCalled();
		mockAddProducts.mockRestore();
		done();
	});
	it('should throw an error if the db fetch operation fails', async (done) => {
		const mockAddProducts = jest.spyOn(db.products, 'findAll');
		mockAddProducts.mockResolvedValue();
		mockAddProducts.mockRejectedValue(new Error('Error occurred'));
		try {
			await dbOperations.retrieveProducts([1,2]);
		} catch (error) {
			expect(error.message).toBe('Error occurred');
		}
		mockAddProducts.mockRestore();
		done();
	});
});

describe('The retriveByFilter function', () => {
	const data = [
		{
			id: 1,
			name : 'Apple - 1kg',
			price: 210,
			quantity: 10,
			imageLink: 'https://techunic-eval4.s3.amazonaws.com/apple.jpg',
			category: 'fruits',
		},
		{
			id: 2,
			name : 'Apple - 1kg',
			price: 210,
			quantity: 10,
			imageLink: 'https://techunic-eval4.s3.amazonaws.com/apple.jpg',
			category: 'fruits',
		}
	];
		
	it('should return product with given filter when db read operation is successful', async(done) => {
		const mockAddProducts = jest.spyOn(db.products, 'findAll');
		mockAddProducts.mockResolvedValue(data);
		await dbOperations.retriveByFilter('fruits');
		expect(mockAddProducts).toHaveBeenCalled();
		mockAddProducts.mockRestore();
		done();
	});
	it('should throw an error if the db fetch operation fails', async (done) => {
		const mockAddProducts = jest.spyOn(db.products, 'findAll');
		mockAddProducts.mockResolvedValue();
		mockAddProducts.mockRejectedValue(new Error('Error occurred'));
		try {
			await dbOperations.retriveByFilter('fruits');
		} catch (error) {
			expect(error.message).toBe('Error occurred');
		}
		mockAddProducts.mockRestore();
		done();
	});
});

describe('The retriveAllCategories function', () => {
	const data = [
		'fruits', 'household'
	];
		
	it('should return product categories with when db read operation is successful', async(done) => {
		const mockAddProducts = jest.spyOn(db.products, 'aggregate');
		mockAddProducts.mockResolvedValue(data);
		await dbOperations.retriveAllCategories();
		expect(mockAddProducts).toHaveBeenCalled();
		mockAddProducts.mockRestore();
		done();
	});
	it('should throw an error if the db fetch operation fails', async (done) => {
		const mockAddProducts = jest.spyOn(db.products, 'aggregate');
		mockAddProducts.mockResolvedValue();
		mockAddProducts.mockRejectedValue(new Error('Error occurred'));
		try {
			await dbOperations.retriveAllCategories();
		} catch (error) {
			expect(error.message).toBe('Error occurred');
		}
		mockAddProducts.mockRestore();
		done();
	});
});

describe('The updateInventory function', () => {
	const data = {
		productId: 1,
		name : 'Apple - 1kg',
		price: 210,
		quantity: 10,
		imageLink: 'https://techunic-eval4.s3.amazonaws.com/apple.jpg',
		category: 'fruits',
	};
		
	it('should return updated product when db write operation is successful', async(done) => {
		const mockAddProducts = jest.spyOn(db.products, 'update');
		mockAddProducts.mockResolvedValue(data);
		await dbOperations.updateInventory(data);
		expect(mockAddProducts).toHaveBeenCalled();
		mockAddProducts.mockRestore();
		done();
	});
	it('should throw an error if the db fetch operation fails', async (done) => {
		const mockAddProducts = jest.spyOn(db.products, 'update');
		mockAddProducts.mockResolvedValue();
		mockAddProducts.mockRejectedValue(new Error('Error occurred'));
		try {
			await dbOperations.updateInventory(data);
		} catch (error) {
			expect(error.message).toBe('Error occurred');
		}
		mockAddProducts.mockRestore();
		done();
	});
});

describe('The addToCart function', () => {
	const data = {
		productId: 1,
		price: 210,
		quantity: 1,
		totalPrice: 210
	};
		
	it('should return updated product when db write operation is successful', async(done) => {
		const mockAddProducts = jest.spyOn(db.cart, 'create');
		mockAddProducts.mockResolvedValue(data);
		await dbOperations.addToCart(data);
		expect(mockAddProducts).toHaveBeenCalled();
		mockAddProducts.mockRestore();
		done();
	});
	it('should throw an error if the db fetch operation fails', async (done) => {
		const mockAddProducts = jest.spyOn(db.cart, 'create');
		mockAddProducts.mockResolvedValue();
		mockAddProducts.mockRejectedValue(new Error('Error occurred'));
		try {
			await dbOperations.addToCart(data);
		} catch (error) {
			expect(error.message).toBe('Error occurred');
		}
		mockAddProducts.mockRestore();
		done();
	});
});