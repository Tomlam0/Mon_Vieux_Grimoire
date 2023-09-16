// Empeche le spam de requêtes HTTP et le bruteforce
const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
    // Fenêtre de requêtes de 1 min avec maximum 6 requêtes
    windowMs: 1 * 60 * 1000,
    max: 6,
    handler: function (req, res, next) {
        return res.status(429).json({
            error: "Trop de tentatives. Réessayez dans une minute.",
        });
    },
});
