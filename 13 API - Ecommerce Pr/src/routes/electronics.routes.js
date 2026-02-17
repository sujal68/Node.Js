const express = require('express');

const { AddProducts, GetProducts } = require('../controller/electronics.controller');

const electroRoutes = express.Router();

electroRoutes.post('/', AddProducts);
electroRoutes.get('/', GetProducts);

module.exports = electroRoutes;