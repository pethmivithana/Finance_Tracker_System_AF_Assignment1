const jwt = require("jsonwebtoken");

const authMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        try {
            const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
            req.user = decoded; // Attach user info (including role) to request

            // Check if role-based authorization is required
            if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "Access denied" });
            }

            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    };
};

module.exports = authMiddleware;
