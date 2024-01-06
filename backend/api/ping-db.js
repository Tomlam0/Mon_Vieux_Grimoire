const mongoose = require("mongoose");
const dbConfig = require("../configs/dbConfig");

module.exports = async (req, res) => {
    try {
        await mongoose.connect(dbConfig.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB ping successful");
        res.status(200).send("DB ping successful");
    } catch (error) {
        console.error("DB ping failed", error);
        res.status(500).send("DB ping failed");
    }
};
