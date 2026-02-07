const express = require('express');
const { addSubCategoryPage, addSubCategory, viewSubCategoryPage } = require('../controller/subCategory.controller');

const subCategoryRoutes = express.Router();

subCategoryRoutes.get('/addSubCategoryPage', addSubCategoryPage);
subCategoryRoutes.post('/addSubCategory', addSubCategory);

subCategoryRoutes.get('/viewSubCategoryPage', viewSubCategoryPage)

module.exports = subCategoryRoutes;