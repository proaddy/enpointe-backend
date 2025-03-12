const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Forbidden: Invalid token" });
        }

        req.user = user;
        // console.log(user, 'authmiddleware');
        next();
    });
};

exports.isUser = (req, res, next) => {
    if (req.user.type !== "user") {
        return res.status(403).json({ message: "Access denied User only" });
    }
    next();
};

exports.isBanker = (req, res, next) => {
    if (req.user.type !== "banker") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};
