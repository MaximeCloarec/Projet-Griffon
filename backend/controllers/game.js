const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.createGame = async (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .json({ message: "Room code and userId are required" });
    }
    const { userId } = req.body;
    const { roomCode } = req.body;

    console.log("Creating game with data:", roomCode, userId);
    if (!roomCode || !userId) {
        return res
            .status(400)
            .json({ message: "Room code and userId are required" });
    }

    try {
        const newGame = await prisma.game.create({
            data: {
                roomCode: roomCode,
                creatorId: userId,
                name: "A new game",
            },
        });
        res.status(201).json({ message: "Game created successfully", newGame });
    } catch (error) {
        console.error("Error creating game:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

exports.getGames = async (req, res) => {
    try {
        const games = await prisma.game.findMany({
            select: {
                id: true,
                roomCode: true,
                name: true,
                creatorId: true,
                createdAt: true,
            },
        });
        res.status(200).json({
            message: "Liste des utilisateurs récupérée avec succès.",
            games,
        });
    } catch (error) {
        console.error("Error fetching games:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

exports.getGame = async (req, res) => {
    const { roomCode } = req.params;
    try {
        const game = await prisma.game.findUnique({
            where: { roomCode },
            include: {
                creator: true,
                players: true,
            },
        });

        if (!game) {
            return res.status(404).json({ message: "Partie non trouvée" });
        }

        res.status(200).json({ game });
    } catch {
        res.status(500).json({
            message: "Erreur lors de la récupération de la partie",
            error: error.message,
        });
    }
};

exports.deleteGame = async (req, res) => {
    const { gameId } = req.params;
    console.log(req.params);

    console.log(`Deleting game with ID: ${gameId}`);

    if (!gameId) {
        return res.status(400).json({ message: "Game ID is required" });
    }

    try {
        const deletedGame = await prisma.game.delete({
            where: { id: gameId },
        });
        res.status(200).json({
            message: "Game deleted successfully",
            deletedGame,
        });
    } catch (error) {
        console.error("Error deleting game:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

exports.joinGame = async (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .json({ message: "Room code and userId are required" });
    }
    console.log(req.body);

    const { userId } = req.body;
    const { roomCode } = req.body;

    if (!userId || !roomCode) {
        return res
            .status(400)
            .json({ message: "Room code and userId are required" });
    }

    try {
        const game = await prisma.game.findUnique({
            where: { roomCode },
            include: { players: true },
        });

        if (!game) {
            return res.status(404).json({ message: "Code de partie invalide" });
        }

        const alreadyJoined = game.players.some((p) => p.id === userId);
        if (!alreadyJoined) {
            await prisma.game.update({
                where: { roomCode },
                data: {
                    players: { connect: { id: userId } },
                },
            });
        }
        res.status(200).json({
            message: "Partie rejointe avec succès",
            game,
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la tentative de rejoindre la partie",
            error: error.message,
        });
    }
};
