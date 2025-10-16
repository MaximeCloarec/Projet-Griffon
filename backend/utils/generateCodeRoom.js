module.exports = (req, res, next) => {
    if (!req.body) {
        return res
            .status(400)
            .json({ message: "Room code and userId are required" });
    }
    try {
        const length = 6;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let roomCode = "";
        for (let i = 0; i < length; i++) {
            roomCode += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        req.body.roomCode = roomCode;

        next();
    } catch (error) {
        console.error("Error generating room code:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
