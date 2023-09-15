const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
const handleCors = require("./middlewares/handle-cors");

const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

const app = express();

require("dotenv").config();

// Connexion Database
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussi !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());
// Middleware pour gérer les erreurs CORS
app.use(handleCors);

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
