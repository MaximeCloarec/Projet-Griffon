module.exports = (io, socket) => {
    socket.on("joinRoom", ({ roomCode, username }) => {
        console.log(`${username} rejoint la room ${roomCode}`);
        socket.join(roomCode);

        socket.to(roomCode).emit("chat:system", {
            message: `${username} a rejoint la partie`,
        });
    });

    socket.on("chat:message", ({ roomCode, username, message }) => {
        if (!message?.trim()) return;

        io.to(roomCode).emit("chat:message", {
            username,
            message,
            timestamp: Date.now(),
        });
    });
};
