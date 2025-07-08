const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectToDatabase() {
    try {
        await mongoose.connect(MONGODB_URI, clientOptions);
        console.log("Connecté à MongoDB !");
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error.message);
        process.exit(1);
    }
}

module.exports = connectToDatabase;
