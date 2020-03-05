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