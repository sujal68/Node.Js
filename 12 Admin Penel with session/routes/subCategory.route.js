const express = require('express');
const { addSubCategoryPage, addSubCategory, viewSubCategoryPage, deleteSubCategory, editSubCategoryPage } = require('../controller/subCategory.controller');

const subCategoryRoutes = express.Router();

subCategoryRoutes.get('/addSubCategoryPage', addSubCategoryPage);
subCategoryRoutes.post('/addSubCategory', addSubCategory);

subCategoryRoutes.get('/viewSubCategoryPage', viewSubCategoryPage)
subCategoryRoutes.get('/deleteSubCategory/:id', deleteSubCategory)

subCategoryRoutes.get('/editSubCategoryPage/:id', editSubCategoryPage)
module.exports = subCategoryRoutes;