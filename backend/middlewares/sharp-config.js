const sharp = require("sharp");
const fs = require("fs");

module.exports = async (req, res, next) => {
    if (!req.file) return next();

    try {
        await sharp(req.file.path)
            .resize(310, 390, { fit: sharp.fit.inside })
            .webp({ quality: 80 })
            .toFile(`${req.file.path.split(".")[0]}.webp`);

        // Supprimer l'image originale
        fs.unlink(req.file.path, (error) => {
            req.file.path = `${req.file.path.split(".")[0]}.webp`;
            if (error) {
                console.log(error);
            }
        });

        next();
    } catch (error) {
        res.status(500).json({ error: "Impossible d'optimiser l'image" });
    }
};
