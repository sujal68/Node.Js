const express = require('express');
const { addSubCategoryPage, addSubCategory, viewSubCategoryPage, deleteSubCategory, editSubCategoryPage, editSubCategory } = require('../controller/subCategory.controller');

const subCategoryRoutes = express.Router();

subCategoryRoutes.get('/addSubCategoryPage', addSubCategoryPage);
subCategoryRoutes.post('/addSubCategory', addSubCategory);

subCategoryRoutes.get('/viewSubCategoryPage', viewSubCategoryPage)
subCategoryRoutes.get('/deleteSubCategory/:id', deleteSubCategory)

subCategoryRoutes.get('/editSubCategory/:id', editSubCategoryPage);
subCategoryRoutes.post('/editSubCategory/:id', editSubCategory);

module.exports = subCategoryRoutes;