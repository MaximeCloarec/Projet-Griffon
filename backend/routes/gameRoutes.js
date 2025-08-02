const express = require("express");
const generateCodeRoom = require("../utils/generateCodeRoom");
const gameController = require("../controllers/game");

module.exports = () => {
    const router = express.Router();

    router.post("/game", gameController.createGame);

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
