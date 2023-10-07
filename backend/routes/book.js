const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const sharp = require("../middlewares/sharp-config");

const bookCtrl = require("../controllers/book");

router.post("/:id/rating", auth, bookCtrl.rateBook);
router.post("/", auth, multer, sharp, bookCtrl.createBook);

router.get("/bestrating", bookCtrl.getBestBook);
router.get("/:id", bookCtrl.getOneBook);
router.get("/", bookCtrl.getAllBooks);

router.put("/:id", auth, multer, sharp, bookCtrl.updateBook);

router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
