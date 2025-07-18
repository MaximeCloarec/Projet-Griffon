module.exports = (req, res, next) => {
    try {
        generateCodeRoom: (length = 6) => {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let code = "";
            for (let i = 0; i < length; i++) {
                code += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
            req.codeRoom = { roomId: roomId };
        };
    } catch (error) {
        console.error("Error generating room code:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
