const express = require('express')
const upload = require('../middleware/multer.middleware');
const { addCategoryPage, addcategory, viewCategoryPage, deleteCategory, editCategoryPage, editCategory } = require('../controller/category.controller');

const categoryRoutes = express.Router();

categoryRoutes.get('/addCategoryPage', addCategoryPage);
categoryRoutes.post('/addCategory', upload.single("category_img"), addcategory);

categoryRoutes.get('/viewCategoryPage', viewCategoryPage);

categoryRoutes.get('/deleteCategory/:id', deleteCategory);

categoryRoutes.get('/editCategory/:id', editCategoryPage)
categoryRoutes.post('/editCategory/:id', upload.single("category_img"), editCategory)

module.exports = categoryRoutes;