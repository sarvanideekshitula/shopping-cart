const { buildServer } = require('../../server');
const dbOperations = require('../utils/dbOperations');
let server;
const init = async () => {
	server = await buildServer();
	await server.initialize();
	return server;
};
describe('In the server', () => {
	let server;

	beforeEach(async () => {
		server = await init();
	});

	afterEach(async () => {
		await server.stop();
	});
	
	it ('The route GET /products should return the contents from the db', async () => {
		const options = {
			method: 'GET',
			url: '/products',
			
		};
		const products = [
			{
				'id': 1,
				'name': 'Apple - 1kg',
				'price': 210,
				'quantity': 10,
				'imageLink': 'https://techunic-eval4.s3.amazonaws.com/apple.jpg',
				'category': 'fruits',
			},
			{
				'id': 2,
				'name': 'Oranges - 1kg',
				'price': 300,
				'quantity': 10,
				'imageLink': 'https://techunic-eval4.s3.amazonaws.com/oranges.jpg',
				'category': 'fruits',
			}
		];
		const mockPostUrls = jest.spyOn(dbOperations, 'retriveAllProducts');
		mockPostUrls.mockResolvedValue(products);
		const response = await server.inject(options);
		expect(response.statusCode).toBe(200);
		expect(response.result).toBe(JSON.stringify(products));
	});
	it ('The route GET /categories should return the contents from the db', async () => {
		const options = {
			method: 'GET',
			url: '/categories',
			
		};
		const categories = ['fruits'];
		const mockPostUrls = jest.spyOn(dbOperations, 'retriveAllCategories');
		mockPostUrls.mockResolvedValue(categories);
		const response = await server.inject(options);
		expect(response.statusCode).toBe(200);
		expect(response.result).toBe(JSON.stringify(categories));
	});
	it ('The route GET /products/category/{categoryName} should return the contents from the db', async () => {
		const options = {
			method: 'GET',
			url: '/products/category/{categoryName}',
			options:{
				params: {categoryName:'name'},
			}
		};
		const products = [
			{
				'id': 1,
				'name': 'Apple - 1kg',
				'price': 210,
				'quantity': 10,
				'imageLink': 'https://techunic-eval4.s3.amazonaws.com/apple.jpg',
				'category': 'fruits',
			},
			{
				'id': 2,
				'name': 'Oranges - 1kg',
				'price': 300,
				'quantity': 10,
				'imageLink': 'https://techunic-eval4.s3.amazonaws.com/oranges.jpg',
				'category': 'fruits',
			}
		];
		const mockPostUrls = jest.spyOn(dbOperations, 'retriveAllProducts');
		mockPostUrls.mockResolvedValue(products);
		const response = await server.inject(options);
		expect(response.statusCode).toBe(200);
		expect(response.result).toBe(JSON.stringify(products));
	});
});