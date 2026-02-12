const Category = require('../model/categories.model');
const SubCategory = require('../model/subCategories.model');

module.exports.addExtraCategoryPage = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        return res.render("extraCategory/addExtraCategoryPage", { admin, currentPath: req.originalUrl.split('?')[0], allCategory, allSubCategory });
    } catch (error) {
        console.log("Error : ", error);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subCategory/viewSubCategoryPage');
    }
}

