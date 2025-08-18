const express = require("express");
const generateCodeRoom = require("../utils/generateCodeRoom");
const gameController = require("../controllers/game");

module.exports = () => {
    const router = express.Router();

    router.post("/game", gameController.createGame);

    router.delete("/game/:gameId", gameController.deleteGame);

    router.get("/games", gameController.getGames);

    return router;
};
