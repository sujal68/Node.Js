const express = require('express');
const routes = express.Router();

routes.use('/electronics', require('./electronics.routes'));

module.exports = routes;