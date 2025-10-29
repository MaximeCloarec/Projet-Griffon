const GameService = require("../Services/GameService.js");
const { validateGame,validateGameCode } = require("../Validators/gameValidator.js");

class GameController {
    //Récupération de tous les jeux en bdd
    async getAllGames(req, res) {
        try {
            const games = await GameService.getAllGame();
            res.json(games);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createGame(req, res) {
        try {
            const { userId } = validateGame(req.body);

            const game = await GameService.createGame(userId);

            res.status(201).json({
                message: "Jeu créé avec succès",
                game,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getGameByRoomCode(req, res) {
        try {
            const { roomCode } = validateGameCode(req.params);

            const game = await GameService.getGameByRoomCode(roomCode);
            res.status(200).json({
                message: "Jeu récupéré avec succès",
                game,
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new GameController();
