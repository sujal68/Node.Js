const express = require('express');
const { AddProducts, GetProducts } = require('../controller/electronics.controller');
const routes = express.Router();

routes.post('/electronics', AddProducts);
routes.get('/electronics', GetProducts);

module.exports = routes;