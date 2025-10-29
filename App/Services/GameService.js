const { PrismaClient } = require("../../generated/prisma");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

class GameService {
    async getAllGame() {
        return prisma.game.findMany();
    }

    //A modifier pour ajouter vérification de l'utilisateur
    async createGame(userId) {
        let existingGame = null;
        const length = 6;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let roomCode = "";
        do {
            roomCode = Array.from({ length }, () =>
                characters.charAt(Math.floor(Math.random() * characters.length))
            ).join("");

            existingGame = await prisma.game.findUnique({
                where: { roomCode },
            });
        } while (existingGame);

        console.log(roomCode);

        return prisma.game.create({
            data: {
                roomCode: roomCode,
                creatorId: userId,
                name: "A new game",
            },
        });
    }

    async getGameByRoomCode(roomCode) {
        const game = await prisma.game.findUnique({
            where: { roomCode },
        });
        if (!game) {
            throw new Error("La partie n'existe pas");
        }
        return game;
    }
}

module.exports = new GameService();
