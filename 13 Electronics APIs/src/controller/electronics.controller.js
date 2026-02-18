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
            status: 500,
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
            status: 500,
            error: true,
            message: "Something Went Wrong",
            error: err,
        });
    }
};

module.exports.DeleteProducts = async (req, res) => {
    try {
        console.log('Delete request id:', req.query.id);

        const deletedProduct = await electronics.findByIdAndDelete(req.query.id, { new: true });

        if (!deletedProduct) {
            return res.status(404).json({
                status: 404,
                error: true,
                message: "Products Deletetion Failed!!",
            });
        }
        return res.status(201).json({
            status: 201,
            error: false,
            message: "Products Deletetion Successfully",
        });

    } catch (err) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: "Something Went Wrong",
            error: err,
        });
    }
}

module.exports.UpdateProducts = async (req, res) => {
    try {

        const updatedProducts = await electronics.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedProducts) {
            return res.status(404).json({
                status: 404,
                error: true,
                message: "Products Updation Failed!!",
            });
        };

        return res.status(201).json({
            status: 201,
            error: false,
            message: "Product Updated Yeeee!!"
        });

    } catch (err) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: "Something Went Wrong",
            error: err,
        });
    }
}