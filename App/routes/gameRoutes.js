const express = require("express");
const gameController = require("../Controllers/GameController.js");

const gameRoutes = () => {
    const router = express.Router();

    router.post("/create", gameController.createGame);

    // router.delete("/:roomCode", gameController.deleteGame); TODO

    router.get("/", gameController.getAllGames);

    router.get("/:roomCode", gameController.getGameByRoomCode);

    // router.post("/join", gameController.joinGame); TODO

    return router;
};
module.exports = gameRoutes;
