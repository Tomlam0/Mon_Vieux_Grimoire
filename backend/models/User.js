const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Facilite la gestion des erreurs d'unicité de l'email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
