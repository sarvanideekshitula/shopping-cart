const { buildServer } = require('./server');

const startServer = async () => {
	const server = await buildServer();
	server.start();
};
startServer();