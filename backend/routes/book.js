const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const sharp = require("../middlewares/sharp-config");

const bookCtrl = require("../controllers/book");

router.get("/bestrating", bookCtrl.getBestBook);
router.get("/:id", bookCtrl.getOneBook);
router.get("/", bookCtrl.getAllBooks);


router.post("/", auth, multer, sharp, bookCtrl.createBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);

router.put("/:id", auth, multer, bookCtrl.updateBook);

router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
