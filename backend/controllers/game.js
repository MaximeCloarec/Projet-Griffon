const Game = require("../models/game");

exports.createGame = async (req, res) => {
    const { romeCode, owner } = req.body;
    if (!romeCode || !owner) {
        return res
            .status(400)
            .json({ message: "Room code and owner are required" });
    }

    try {
        const game = new Game({
            roomCode: romeCode,
            owner: owner,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        });
        res.status(201).json({ message: "Game created successfully", game });
    } catch (error) {
        console.error("Error creating game:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
