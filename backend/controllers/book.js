const sharp = require("sharp");

const Book = require("../models/Book");

/**
 * GET
 */
exports.getAllBooks = (req, res, next) => {};

exports.getOneBook = (req, res, next) => {};

exports.getBestBook = (req, res, next) => {};

/**
 * POST
 */
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    const book = new Book({
        ...bookObject,
        // le userId est récupéré du middleware auth.js
        userId: req.auth.userId,
        // // Construction de l'URL de l'image téléchargée.
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
        // averageRating: [0],
    });

    book.save()
        .then(() => res.status(201).json({ message: "Livre ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
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
