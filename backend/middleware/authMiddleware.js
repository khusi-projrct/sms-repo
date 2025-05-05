const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access Denied: No token Provided" });

    const tokenToVerify = token.startsWith("Bearer ") ? token.slice(7) : token;

    try {
        const decoded = jwt.verify(tokenToVerify, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token " });
    }
};

module.exports = authMiddleware;



