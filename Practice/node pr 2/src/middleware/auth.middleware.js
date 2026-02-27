const JWT = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");
const { MSG } = require("../utils/msg");

module.exports.authMiddleware = (req, res, next) => {

    let token = req.headers.authorization;

    if (!token)
        return res.status(401).json(errorResponse(401, "Token Required"));

    token = token.split(" ")[1];

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json(errorResponse(401, MSG.Token_Invalid));
    }
};