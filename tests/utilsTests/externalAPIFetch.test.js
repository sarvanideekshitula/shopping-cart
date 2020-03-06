const {fetchAllProducts, fetchCategory} = require('../../src/utils/externalAPIFetch');
const axios = require('axios').default;

describe('The fetchAllProducts function', () => {
	it('should get products from external API', async()=> {
		const mockGet = jest.spyOn(axios, 'get');
		const data =[
			{
				'id': 1,
				'name': 'Apple - 1kg',
				'price': 210,
				'quantity': 10,
				'imageLink': 'https://techunic-eval4.s3.amazonaws.com/apple.jpg'
			},
			{
				'id': 2,
				'name': 'Oranges - 1kg',
				'price': 300,
				'quantity': 10,
				'imageLink': 'https://techunic-eval4.s3.amazonaws.com/oranges.jpg'
			},
		];
		mockGet.mockResolvedValue(data);
		const result = await fetchAllProducts();
		expect(result).toBe(data);
		mockGet.mockRestore();
	});
	it('should throw an error if the axios fetch operation fails', async (done) => {
		const mockGet = jest.spyOn(axios, 'get');
		mockGet.mockRejectedValue(new Error('Error occurred in retriving products from api'));
		try {
			await fetchAllProducts();
		} catch (error) {
			expect(error.message).toBe('Error occurred in retriving products from api');
		}
		mockGet.mockRestore();
		done();
	});
});

describe('The fetchCategory function', () => {
	it('should fetch the category of product from api', async() => {
		const mockGet = jest.spyOn(axios, 'get');
		const data = {
			'category': {data:{category:'household'}},
			'productId': 1
		};
		mockGet.mockResolvedValue(data);
		const result = await fetchCategory();
		expect(result).toBe(data);
		mockGet.mockRestore();
	});
	it('should throw an error if the axios fetch operation fails', async (done) => {
		const mockGet = jest.spyOn(axios, 'get');
		mockGet.mockRejectedValue(new Error('Error occurred in retriving category from api'));
		try {
			await fetchCategory();
		} catch (error) {
			expect(error.message).toBe('Error occurred in retriving category from api');
		}
		mockGet.mockRestore();
		done();
	});
});