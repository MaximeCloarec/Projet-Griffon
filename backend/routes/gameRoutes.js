const express = require("express");

module.exports = () => {
    const router = express.Router();

    router.post("/game", async (req, res) => {
    });

    router.get("/game/:roomCode", async (req, res) => {
        const { roomCode } = req.params;
        res.status(200).json({
            message: "Game details retrieved successfully",
            roomCode: roomCode,
        });
    });

    router.delete("/game/:roomCode", async (req, res) => {});

    return router;
};
