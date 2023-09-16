const express = require("express");
const router = express.Router();

const rateLimit = require("../middlewares/rate-limit");
const emailValidator = require("../middlewares/email-validator");
const passwordValidator = require("../middlewares/password-validator");

const userCtrl = require("../controllers/user");

router.post(
    "/signup",
    rateLimit,
    emailValidator,
    passwordValidator,
    userCtrl.signup
);
router.post("/login", rateLimit, userCtrl.login);

module.exports = router;
