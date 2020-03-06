const { productRoutes } = require('./productRoutes');
const { cartRoutes } = require('./cartRoutes');

module.exports = [...productRoutes, ...cartRoutes];
