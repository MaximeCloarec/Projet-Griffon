const { Server } = require("socket.io");
const chatSocket = require("./chat.socket");
const tokenSocket = require("./token.socket");

module.exports = function initSocket(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket connecté", socket.id);
    });
    io.on("connection", (socket) => {
        chatSocket(io, socket);
    });
    io.on("connection", (socket) => {
        tokenSocket(io, socket);
    });

    return io;
};
