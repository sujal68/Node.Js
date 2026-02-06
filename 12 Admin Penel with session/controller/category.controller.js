const category = require('../model/categories.model');
const fs = require('fs');

module.exports.addCategoryPage = (req, res) => {
    return res.render("category/addCategoryPage", { currentPath: req.originalUrl.split('?')[0] });
}