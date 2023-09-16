// Vérification des règles courantes du mot de passe
module.exports = (req, res, next) => {
    const passwordRules =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])(?!.*\s).{8,}$/;

    if (!passwordRules.test(req.body.password)) {
        return res.status(400).json({
            message:
                "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre, un caractère spécial et ne doit contenir aucun espace.",
        });
    }
    next();
};
