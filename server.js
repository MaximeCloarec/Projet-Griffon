require("dotenv").config({ path: __dirname + "/.env" });
const http = require("node:http");
const app = require("./app");
const initSocket = require("./src/App/sockets");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} + Socket.io enabled , To stop server press Ctrl+C`);
});

server.on("error", (err) => {
    console.error("Failed to start server:", err.message);
});
