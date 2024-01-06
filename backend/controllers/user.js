const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// Gère la création de compte utilisateur
// exports.signup = (req, res, next) => {
//     // Hashage du mot de passe
//     bcrypt
//         .hash(req.body.password, 10)
//         .then((hash) => {
//             const user = new User({
//                 email: req.body.email,
//                 password: hash,
//             });
//             user.save()
//                 .then(() =>
//                     res.status(201).json({ message: "Utilisateur créé !" })
//                 )
//                 .catch((error) => res.status(400).json({ error }));
//         })
//         .catch((error) => res.status(500).json({ error }));
// };

// Gère la connexion
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        // Cherche l'email dans la base de données et le stock dans la promesse "user"
        .then((user) => {
            if (user === null) {
                res.status(401).json({
                    message: "Paire identifiant / mot de passe incorrect",
                });
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(401).json({
                                message:
                                    "Paire identifiant / mot de passe incorrect",
                            });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                // Crée un JSON Web Token pour l'authentification et l'autorisation
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.JWT_SECRET_KEY,
                                    { expiresIn: "4h" }
                                ),
                            });
                        }
                    })
                    .catch((error) => res.status(500).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
