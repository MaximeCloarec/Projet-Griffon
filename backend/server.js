//Variables environment
require("dotenv").config({ path: __dirname + "/.env" });

const PORT = process.env.PORT || 3000;
const server = require("http").createServer(require("./app"));

//Server listening
server
    .listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
    .on("error", (err) => {
        console.error("Failed to start server:", err.message);
    });
