const fs = require("fs");

const Book = require("../../models/Book");

/**
 * DELETE
 */
exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                return res
                    .status(403)
                    .json({ message: "Utilisateur non autorisé" });
            }
            const filename = book.imageUrl.split("/").pop();

            Book.deleteOne({ _id: req.params.id })
                .then(() => {
                    // Pour supprimer l'image du dossier "images" également
                    fs.unlink(`images/${filename}`, (error) => {
                        if (error) {
                            res.status(500).json({ error });
                        } else {
                            res.status(200).json({
                                message: "Livre supprimé avec succès",
                            });
                        }
                    });
                })
                .catch((error) => res.status(401).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
