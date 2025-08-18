const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.createGame = async (req, res) => {
    const { roomCode, userId } = req.body;
    console.log("Creating game with data:", roomCode, userId);
    if (!roomCode || !userId) {
        return res
            .status(400)
            .json({ message: "Room code and userId are required" });
    }

    try {
        const newGame = await prisma.Game.create({
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
