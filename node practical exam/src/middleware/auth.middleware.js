const JWT = require("jsonwebtoken");
const UserAuthService = require('../services/user.services');
const userAuthService = new UserAuthService();

module.exports.authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ status: 400, error: true, msg: "Token Is Requireeddd..." })
    }
    token = token.slice(7, token.length);
    try {
        const decoded = JWT.verify(token, process.env.secretKey);

        const user = await userAuthService.fetchSingleUser({ _id: decoded.id });
        if (user) {
            req.user = user;
            next();
        }
        else {
            return res.status(400).json({ status: 400, error: true, msg: "User Not Found!!" })
        }
    } catch (error) {
        return res.status(400).json({ status: 400, error: error, msg: "Somethign Went Wrong" })

    }
}