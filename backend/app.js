require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const path = require("path");

const dbConfig = require("./configs/dbConfig");

const handleCors = require("./middlewares/handle-cors");
const handleError = require("./middlewares/handle-error");

const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

const app = express();

// Connexion Database
mongoose
    .connect(dbConfig.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussi !"))
    .catch((error) => console.log("Connexion à MongoDB échouée !", error));

// Configure la sécurité des headers HTTP
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Pour permettre les "req.body"
app.use(express.json());

// Middleware pour gérer les erreurs CORS
app.use(handleCors);

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// Middleware pour gérer les erreurs globales
app.use(handleError);

module.exports = app;
