const Category = require("../model/categories.model");
const SubCategory = require("../model/subCategories.model");

module.exports.addSubCategoryPage = async (req, res) => {
    try {
        const allCategory = await Category.find();
        return res.render('subCategory/addSubCategoryPage', { allCategory, currentPath: req.originalUrl.split('?')[0] });
    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subCategory/addSubCategoryPage');
    }
}

module.exports.addSubCategory = async (req, res) => {
    try {
        console.log(req.body);

        const newSubCategory = await SubCategory.create(req.body);

        if (newSubCategory) {
            req.flash('success', 'SubCategory Inserted Successfully..');
        } else {
            req.flash('error', 'SubCategory Insertion Failed..');
        }
        return res.redirect('/subCategory/addSubCategoryPage');

    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subCategory/addSubCategoryPage');
    }
}

module.exports.viewSubCategoryPage = async (req, res) => {
    try {
        const allSubCategory = await SubCategory.find().populate('category_id');
        return res.render('subCategory/viewSubCategoryPage', { allSubCategory, currentPath: req.originalUrl.split('?')[0] });
    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subCategory/viewSubCategoryPage');
    }
}