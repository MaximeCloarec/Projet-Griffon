const {
    validateGameCode,
    validateGame,
} = require("../Validators/gameValidator.js");

class GameController {
    constructor(gameService) {
        this.gameService = gameService;
    }

    //Récupération de tous les jeux en bdd
    getAllGames = async (req, res) => {
        try {
            const games = await this.gameService.getAllGame();
            res.json(games);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    createGame = async (req, res) => {
        try {
            const { userId } = validateGame(req.body);

            const game = await this.gameService.createGame(userId);

            res.status(201).json({
                message: "Jeu créé avec succès",
                game,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    getGameByRoomCode = async (req, res) => {
        try {
            const { roomCode } = validateGameCode(req.params);

            const game = await this.gameService.getGameByRoomCode(roomCode);
            res.status(200).json({
                message: "Jeu récupéré avec succès",
                game,
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    };

    joinGame = async (req, res) => {
        try {
            const { roomCode } = validateGameCode(req.body);

            const { userId } = validateGame(req.body);

            const game = await this.gameService.getGameByRoomCode(roomCode);

            const alreadyJoined = await GameService.checkUserInGame(
                game,
                userId,
            );

            if (!alreadyJoined) {
                await this.gameService.addPlayersToGame(roomCode, userId);
            }
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    };
}

module.exports = GameController;
