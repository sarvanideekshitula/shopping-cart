const Hapi = require('@hapi/hapi');
const routes = require('./src/routes/index');

const buildServer = async () => {
	try {
		const server = Hapi.Server({
			host: 'localhost',
			port: 8080,
			routes: {
				cors: true,
			},
		});
		server.route(routes);
		return server;
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = { buildServer };