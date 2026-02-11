const express = require('express');
const { addExtraCategoryPage } = require('../controller/extracategory.controller');

const extraCategoryRoutes = express.Router();

extraCategoryRoutes.get('/addExtraCategoryPage', addExtraCategoryPage)

module.exports = extraCategoryRoutes;
