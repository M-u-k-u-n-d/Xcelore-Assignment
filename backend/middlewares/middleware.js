const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// Load environment variables once at the top
dotenv.config({ path: ".env.local" });

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId;
            req.user = decoded; // Assuming the token contains user information
            next();
        } catch (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
    } else {
        
        return res.status(401).json({ message: "Not authorized, token not available" });
    }
};

const adminMiddleware = (req, res, next) => {
    const role = req.headers.role;
    if ( role === "admin") {
        next();
    } else {
        return res.status(401).json({ message: "Not authorized" });
    }
};

module.exports = {
    authMiddleware,
    adminMiddleware,
};
