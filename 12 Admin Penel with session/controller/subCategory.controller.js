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

module.exports.deleteSubCategory = async (req, res) => {
    try {
        const deletedSubcategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (deletedSubcategory) {
            req.flash('success', `${deletedSubcategory.subCategory_name} SubCategory Deleted Successfully..`);
        } else {
            req.flash('error', `${deletedSubcategory.subCategory_name} SubCategory Deletion Failed..`);
        }
        return res.redirect('/subCategory/viewSubCategoryPage');
    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subCategory/viewSubCategoryPage');
    }
}

module.exports.editSubCategoryPage = async (req, res) => {
    try {
        const subCategoryData = await SubCategory.findById(req.params.id).populate('category_id');
        const allCategory = await Category.find();

        return res.render('subCategory/editSubCategoryPage', { subCategoryData, allCategory, currentPath: req.originalUrl.split('?')[0] });
    } catch (error) {
        console.log("Error : ", error);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subCategory/viewSubCategoryPage');
    }
}

module.exports.editSubCategory = async (req, res) => {
    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedSubCategory) {
            req.flash('success', `${updatedSubCategory.subCategory_name} SubCategory Updated Successfully..`);
        } else {
            req.flash('error', `${updatedSubCategory.subCategory_name} SubCategory Updation Failed..`);
        }
        return res.redirect('/subCategory/viewSubCategoryPage');
    } catch (error) {
        console.log("Error : ", error);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subCategory/viewSubCategoryPage');
    }
}