const UserAuthServices = require('../services/user.services');
const userAuthServices = new UserAuthServices();
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt')

module.exports.registerUser = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 11);

        const user = await userAuthServices.registerUser(req.body);

        if (!user) {
            return res.status(400).json({ status: 400, error: true, msg: "User Registration Failaed" })
        }

        return res.status(200).json({ status: 200, error: false, msg: "User Registration successfullydone", result: user })

    } catch (error) {
        console.log("Something Went Wrong!!");
        return res.status(400).json({ status: 400, error: true, msg: "Something Went Wrong!!" })
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const user = await userAuthServices.fetchSingleUser({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ status: 400, error: true, msg: "User Not Found!!!!!!" })
        }

        const isPassword = await bcrypt.compare(req.body.password, user.password)

        if (!isPassword) {
            return res.status(400).json({ status: 400, error: true, msg: "Invalid Passwordd!!" })
        }

        const payload = {
            id: user.id
        };

        const token = JWT.sign(payload, process.env.secretKey)

        return res.status(200).json({ status: 200, error: false, msg: "User Login successfullydone", token: token })

    } catch (error) {
        console.log("Something Went Wrong!!");
        return res.status(400).json({ status: 400, error: true, msg: "Something Went Wrong!!" })
    }
}