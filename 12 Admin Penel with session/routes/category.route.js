const express = require('express')
const upload = require('../middleware/multer.middleware');
const { addCategoryPage } = require('../controller/category.controller');

const categoryRoutes = express.Router();

categoryRoutes.get('/addCategoryPage', addCategoryPage);

module.exports = categoryRoutes;