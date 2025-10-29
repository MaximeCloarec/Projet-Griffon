require("dotenv").config({ path: __dirname + "/.env" });
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
    console.error("Failed to start server:", err.message);
});
