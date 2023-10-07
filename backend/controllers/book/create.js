const fs = require("fs");

const Book = require("../../models/Book");

/**
 * POST
 */
exports.rateBook = (req, res, next) => {
    const user = req.body.userId;

    const newRating = {
        userId: req.body.userId,
        grade: req.body.rating,
    };

    // sécurité d'utilisateur malveillant
    if (user !== req.auth.userId) {
        return res.status(403).json({ message: "Non autorisé" });
    }

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            // par sécurité à nouveau
            if (book.ratings.find((rating) => rating.userId === user)) {
                return res.status(401).json({ message: "Livre déjà noté" });
            }
            book.ratings.push(newRating);

            // Mettre à jour la note moyenne
            const totalRatings = book.ratings.reduce(
                (acc, curr) => acc + curr.grade,
                0
            );
            book.averageRating =
                Math.round((totalRatings / book.ratings.length) * 10) / 10;

            return book
                .save()
                .then((updatedBook) => res.status(200).json(updatedBook))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};

// ################################
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    // Anticipation d'une eventuelle requête malveillante
    delete bookObject._id;
    delete bookObject._userId;

    const book = new Book({
        ...bookObject,
        // le userId est récupéré du middleware auth.js
        userId: req.auth.userId,
        // // Construction de l'URL de l'image téléchargée.
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename.split(".")[0]
        }.webp`,
        averageRating: 0,
    });
    book.save()
        .then(() => res.status(201).json({ message: "Livre ajouté !" }))
        // En cas d'erreur, supprimer l'image qui est stockée par multer dans le dossier images
        .catch((error) => {
            fs.unlink(req.file.path, (error) => {
                req.file.path = `${req.file.path.split(".")[0]}.webp`;
            });
            res.status(400).json({ error });
        });
};
