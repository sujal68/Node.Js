const express = require('express');

const { AddProducts, GetProducts, DeleteProducts, UpdateProducts } = require('../controller/electronics.controller');

const electroRoutes = express.Router();

electroRoutes.post('/', AddProducts);
electroRoutes.get('/', GetProducts);
electroRoutes.delete('/', DeleteProducts);
electroRoutes.patch('/:id', UpdateProducts)
module.exports = electroRoutes;