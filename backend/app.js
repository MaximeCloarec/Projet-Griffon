//Importing necessary modules
const express = require("express");
const cors = require("cors");
const path = require("path");
// Importing routes
const gameRoutes = require("./routes/gameRoutes");
const userRoutes = require("./routes/userRoutes");

// Create an Express application
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "../frontend")));


// Adding routes
app.use("/api/games", gameRoutes());
app.use("/api/users", userRoutes());

//404 Error Handling
app.use((req, res) => {
    res.status(404).json({ message: "404 Not Found" });
});

//Exporting the app
module.exports = app;
