const multer = require("multer");

// Sécurité des extensions d'images autorisées
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};

// Stock les images uploadées dans le dossier racine images et modifie leurs noms
const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        // On remplace les espaces par des underscores dans le nom d'origine du fichier.
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});

// Configuration avec une limite de taille de fichier de 2MB
module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
}).single("image");
