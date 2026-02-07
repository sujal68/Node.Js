const Category = require("../model/categories.model");
const subCategory = require("../model/subCategories.model");

module.exports.addSubCategoryPage = async (req, res) => {
    try {
        const categoryData = await Category.find({});
        return res.render('subCategory/addSubCategoryPage', { categoryData, currentPath: req.originalUrl.split('?')[0] });
    } catch (error) {
        req.flash('error', 'Failed to load Add sub category page. Please try again.');
        console.log("Something Went Wrong", error);
        res.redirect('/subCategory/viewSubCategoryPage');
    }
};