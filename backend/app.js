const express = require("express");
const mongoose = require("mongoose");

const path = require("path");

const app = express();

require("dotenv").config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connexion à MongoDB réussi !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

module.exports = app;
