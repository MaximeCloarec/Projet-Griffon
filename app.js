const express = require("express");
const cors = require("cors");

// Routes
const gameRoutes = require("./src/App/routes/gameRoutes");
const userRoutes = require("./src/App/routes/userRoutes");

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes principales
app.use("/api/games", gameRoutes());
app.use("/api/users", userRoutes());

// 404
app.use((req, res) => {
    res.status(404).json({ message: "404 Not Found" });
});

module.exports = app;
