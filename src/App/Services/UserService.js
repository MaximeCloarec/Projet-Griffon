const { PrismaClient } = require("../../generated/prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserService {
    constructor(prismaClient = new PrismaClient()) {
        this.prisma = prismaClient;
    }

    setPrismaClient(client) {
        this.prisma = client;
    }

    async createUser(email, password) {
        const existing = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existing) throw new Error("Ce mail est déja utilisé");

        const hashed = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: { email, password: hashed },
        });
    }

    async loginUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                createdGames: true,
                joinedGames: true,
            },
        });
        if (!user) throw new Error("Email ou mot de passe incorrect");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Email ou mot de passe incorrect");

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
                createdGames: user.createdGames,
                joinedGames: user.joinedGames,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const { password: _, ...safeUser } = user;
        return { user: safeUser, token };
    }

    async getAllUser() {
        return this.prisma.user.findMany({
            omit: {
                password: true,
            },
            include: {
                createdGames: true,
                joinedGames: true,
            },
        });
    }

    async deleteUser(id) {
        await this.prisma.game.deleteMany({
            where: { creatorId: id },
        });
        return this.prisma.user.delete({
            where: { id },
        });
    }
}

// Instance par défaut
module.exports = new UserService();
module.exports.UserService = UserService; // <-- export de la classe pour les tests
