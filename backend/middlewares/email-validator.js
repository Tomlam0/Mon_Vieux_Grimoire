// Vérification des règles courantes de l'email
module.exports = (req, res, next) => {
    const emailRules = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRules.test(req.body.email)) {
        return res.status(400).json({
            message:
                "L'adresse e-mail saisie n'est pas valide. Veuillez vérifier et essayer à nouveau.",
        });
    }
    next();
};
