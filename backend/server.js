//Variables environment
require("dotenv").config({path: __dirname + "/.env"});

//Server creation
const http = require("http");
const app = require("./app"); // Import the Express app
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app); // Create an HTTP server with the Express app
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for CORS
    },
});

//Database connection
// connectToDatabase();

//Socket IO setup
io.on("connection", (socket) => {
    //Event for connection
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

//Server listening
server
    .listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
    .on("error", (err) => {
        console.error("Failed to start server:", err.message);
    });
