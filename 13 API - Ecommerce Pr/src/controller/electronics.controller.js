const electronics = require('../model/electronics.model');

module.exports.AddProducts = async (req, res) => {
    try {
        const data = await electronics.create(req.body);
        return res.status(200).json({
            error: false,
            message: "Product Added Successfully",
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Something Went Wrong",
            error: err,
        });
    }
};

module.exports.GetProducts = async (req, res) => {
    try {
        const data = await electronics.find();
        return res.status(200).json({
            error: false,
            message: "Products Fetched Successfully",
            data: data,
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Something Went Wrong",
            error: err,
        });
    }
};