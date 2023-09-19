const fs = require("fs");
const sharp = require("sharp");

const Book = require("../models/Book");

/**
 * POST
 */
exports.rateBook = (req, res, next) => {
    const user = req.body.userId;

    const newRating = {
        userId: req.body.userId,
        grade: req.body.rating,
        _id: req.body._id,
    };

    // sécurité d'utilisateur malveillant
    if (user !== req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
    } else {
        Book.findOne({ _id: req.params.id })
            .then((book) => {
                // par sécurité à nouveau
                if (book.ratings.find((rating) => rating.userId === user)) {
                    res.status(401).json({ message: "Livre déjà noté" });
                } else {
                    // En cours
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }
};

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

/**
 * GET
 */
exports.getBestBook = (req, res, next) => {
    Book.find()
        .sort({ averageRating: -1 })
        .limit(3)
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((books) => {
            res.status(200).json(books);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => {
            res.status(200).json(books);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

/**
 * PUT
 */
exports.updateBook = (req, res, next) => {
    const bookObject = req.file
        ? // Si modification de l'image on copie les nouvelles données
          {
              ...JSON.parse(req.body.book),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename.split(".")[0]
              }.webp`,
          }
        : { ...req.body };

    delete bookObject._userId;

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message: "Utilisateur non autorisé" });
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject })
                    .then(() =>
                        res.status(200).json({ message: "Livre modifié" })
                    )
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

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
            const filename = book.imageUrl.split("/images/")[1];

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
