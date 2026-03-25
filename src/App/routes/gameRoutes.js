const express = require("express");
const GameController = require("../Controllers/GameController");
const GameService = require("../Services/GameService");
const gameController = new GameController(new GameService());

const gameRoutes = () => {
    const router = express.Router();

    router.post("/create", gameController.createGame);

    // router.delete("/:roomCode", gameController.deleteGame); TODO

    router.get("/", gameController.getAllGames);

    router.get("/:roomCode", gameController.getGameByRoomCode);

    router.post("/join", gameController.joinGame);

    return router;
};
module.exports = gameRoutes;
