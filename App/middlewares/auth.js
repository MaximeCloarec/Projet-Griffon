const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
    const token = req.headers("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Accès non autorisé." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: "Token invalide.", error: error.message });
    }
};
