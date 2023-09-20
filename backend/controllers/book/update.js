const Book = require("../../models/Book");

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