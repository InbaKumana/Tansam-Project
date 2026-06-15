const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization; /*it stores the JWT */

    if (!token) {
        return res.status(401).json({
            message: "Token Missing"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded; 

        next();/* goes to controller*/

    } catch (error) {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = authMiddleware;