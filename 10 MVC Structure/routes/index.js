const express = require('express');
const { home, Employee } = require('../controllers/home.controller');
const routes = express.Router();

console.log('routing..');

routes.get('/', home);
routes.get('/Employee', Employee);

module.exports = routes;