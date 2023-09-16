const fs = require("fs");
const sharp = require("sharp");
const Book = require("../models/Book");

/**
 * GET
 */
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => {
            res.status(200).json(books);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
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

exports.getBestBook = (req, res, next) => {};

/**
 * POST
 */
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

exports.rateBook = (req, res, next) => {};

/**
 * PUT
 */
exports.updateBook = (req, res, next) => {};

/**
 * DELETE
 */
exports.deleteBook = (req, res, next) => {};
