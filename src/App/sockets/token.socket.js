module.exports = (io, Socket) => {
    Socket.on("token:moved", ({ x:posX, y:posY }) => {
        console.log(posX, posY);

        Socket.broadcast.emit("token:update", { posX, posY });
    });
};
