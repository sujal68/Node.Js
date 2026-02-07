const express = require('express');
const { addSubCategoryPage } = require('../controller/subCategory.controller');

const subCategoryRoutes = express.Router();

subCategoryRoutes.get('/addSubCategoryPage', addSubCategoryPage)

module.exports = subCategoryRoutes;