const express = require("express");
const generateCodeRoom = require("../utils/generateCodeRoom");
const gameController = require("../controllers/game");

module.exports = () => {
    const router = express.Router();

    router.post("/create", generateCodeRoom, gameController.createGame);

    router.delete("/:gameId", gameController.deleteGame);

    router.get("/", gameController.getGames);

    router.get("/:roomCode", gameController.getGame);

    router.post("/join", gameController.joinGame);

    return router;
};
