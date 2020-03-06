const {getAllProducts, getProductsByFilter} = require('../../src/handlers/products');
const dbOperations = require('../../src/utils/dbOperations');
const externalAPIFetch = require('../../src/utils/externalAPIFetch');

describe('The getAllProducts function', () => {
	it('should call response with all the products and statuscode 200 when db is not empty', async() => {
		const mockretriveAllProducts = jest.spyOn(dbOperations, 'retriveAllProducts');
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
		mockretriveAllProducts.mockResolvedValue(products);
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => ({ code: codeMock }),
			),
		};
		await getAllProducts({}, mockHandler);
		expect(mockretriveAllProducts).toHaveBeenCalled();
		expect(codeMock).toHaveBeenCalledWith(200);
		expect(mockHandler.response).toHaveBeenCalledWith(JSON.stringify(products));
	});
	it('should fetch data from external api if the db is empty', async() => {
		const mockretriveAllProducts = jest.spyOn(dbOperations, 'retriveAllProducts');
		const products = [];
		mockretriveAllProducts.mockResolvedValue(products);
		const mockFetchAllProducts = jest.spyOn(externalAPIFetch, 'fetchAllProducts');
		const data = [
			{
				'id': 1,
				'name': 'Apple - 1kg',
				'price': 210,
				'quantity': 10,
				'imageLink': 'https://techunic-eval4.s3.amazonaws.com/apple.jpg'
			}
		];
		mockFetchAllProducts.mockResolvedValue(data);
		const mockFetchCategory = jest.spyOn(externalAPIFetch, 'fetchCategory');
		const category = {
			'category': 'household'
		};
		mockFetchCategory.mockResolvedValue(category);
		const mockAddProductsToDb = jest.spyOn(dbOperations, 'addProductsToDb');
		mockAddProductsToDb.mockResolvedValue();
		const mockretriveAllProducts2 = jest.spyOn(dbOperations, 'retriveAllProducts');
		const products2 = [
			{
				'id': 1,
				'name': 'Apple - 1kg',
				'price': 210,
				'quantity': 10,
				'imageLink': 'https://techunic-eval4.s3.amazonaws.com/apple.jpg',
				'category': 'fruits',
			},
		];
		mockretriveAllProducts2.mockResolvedValue(products2);
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => ({ code: codeMock }),
			),
		};
		await getAllProducts({}, mockHandler);
		expect(mockretriveAllProducts2).toHaveBeenCalled();
		expect(codeMock).toHaveBeenCalledWith(200);
		expect(mockHandler.response).toHaveBeenCalledWith(JSON.stringify(products2));
	});
	it('should call response with error message and status code 500 if it fails to fetch data', async () => {
		const mockretriveAllProducts = jest.spyOn(dbOperations, 'retriveAllProducts');
		mockretriveAllProducts.mockRejectedValue(new Error('Error occurred in retriving products from db'));
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => ({ code: codeMock }),
			),
		};
		await getAllProducts({}, mockHandler);
		expect(mockretriveAllProducts).toHaveBeenCalled();
		expect(codeMock).toHaveBeenCalledWith(500);
		expect(mockHandler.response).toHaveBeenCalledWith('Error occurred in retriving products from db');
	});
});

describe('The getProductsByFilter function', () => {
	it('should call response with all the products and statuscode 200 when db is not empty', async() => {
		const mockretriveAllProducts = jest.spyOn(dbOperations, 'retriveByFilter');
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
		mockretriveAllProducts.mockResolvedValue(products);
		const mockreq = {
			params: {categoryName: 'name'},
		};
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => ({ code: codeMock }),
			),
		};
		await getProductsByFilter(mockreq, mockHandler);
		expect(mockretriveAllProducts).toHaveBeenCalled();
		expect(codeMock).toHaveBeenCalledWith(200);
		expect(mockHandler.response).toHaveBeenCalledWith(JSON.stringify(products));
	});
	
	it('should call response with error message and status code 500 if it fails to fetch data', async () => {
		const mockretriveAllProducts = jest.spyOn(dbOperations, 'retriveAllProducts');
		mockretriveAllProducts.mockRejectedValue(new Error('Error occurred'));
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => ({ code: codeMock }),
			),
		};
		const mockreq = {
			params: {categoryName: 'name'},
		};
		await getProductsByFilter(mockreq, mockHandler);
		expect(mockretriveAllProducts).toHaveBeenCalled();
		expect(codeMock).toHaveBeenCalledWith(500);
		expect(mockHandler.response).toHaveBeenCalledWith('Error occurred');
	});
});