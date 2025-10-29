const express = require("express");
const gameController = require("../Controllers/GameController.js");

module.exports = () => {
    const router = express.Router();

    router.post("/create", gameController.createGame);

    // router.delete("/:roomCode", gameController.deleteGame);

    router.get("/", gameController.getAllGames);

    router.get("/:roomCode", gameController.getGameByRoomCode);

    // router.post("/join", gameController.joinGame);

    return router;
};
