

exports.createGame = async (req, res) => {
    console.log("Creating game with data:", req.body);

    const { roomCode, owner } = req.body;
    if (!roomCode || !owner) {
        return res
            .status(400)
            .json({ message: "Room code and owner are required" });
    }

    try {
        const game = new Game({
            roomCode: roomCode,
            owner: owner,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        });
        res.status(201).json({ message: "Game created successfully", game });
    } catch (error) {
        console.error("Error creating game:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
