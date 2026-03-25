const { PrismaClient } = require("../../generated/prisma");

class GameService {
    constructor(prismaClient = new PrismaClient()) {
        this.prisma = prismaClient;
    }

    getAllGame = async () => {
        return this.prisma.game.findMany();
    };

    //A modifier pour ajouter vérification de l'utilisateur
    createGame = async (userId) => {
        let existingGame = null;
        const length = 6;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let roomCode = "";
        do {
            roomCode = Array.from({ length }, () =>
                characters.charAt(
                    Math.floor(Math.random() * characters.length),
                ),
            ).join("");

            existingGame = await this.prisma.game.findUnique({
                where: { roomCode },
            });
        } while (existingGame);

        return this.prisma.game.create({
            data: {
                roomCode: roomCode,
                creatorId: userId,
                name: "A new game",
            },
        });
    };

    getGameByRoomCode = async (roomCode) => {
        const game = await this.prisma.game.findUnique({
            where: { roomCode: roomCode },
            include: { players: true },
        });
        if (!game) {
            throw new Error("La partie n'existe pas");
        }
        return game;
    };

    checkUserInGame = async (game, userId) => {
        if (game.creatorId === userId) {
            throw new Error("Le créateur de la partie en fait déjà partie");
        }
        if (game.players.some((p) => p.id === userId)) {
            throw new Error("L'utilisateur a déjà rejoint la partie");
        }
        return false;
    };

    addPlayersToGame = async (roomCode, userId) => {
        return this.prisma.game.update({
            where: { roomCode },
            data: {
                players: { connect: { id: userId } },
            },
        });
    };
}

module.exports = GameService;
