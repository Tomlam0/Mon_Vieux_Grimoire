const jwt = require("jsonwebtoken");

require("dotenv").config();

// Utilisé pour vérifier l'authenticité du token JWT.
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Extrait de l'userId du payload
        const userId = decodedToken.userId;

        req.auth = {
            userId: userId,
        };

        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};
