const { PrismaClient } = require("../../generated/prisma");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

class UserService {
    async createUser(email, password) {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) throw new Error("Ce mail est déja utilisé");

        const hashed = await bcrypt.hash(password, 10);

        return prisma.user.create({
            data: { email, password: hashed },
        });
    }

    async loginUser(email, password) {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                createdGames: true,
                joinedGames: true,
            },
        });
        if (!user) throw new Error("Email ou mot de passe incorrect");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Email ou mot de passe incorrect");

        //Create JWT Token
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
        return prisma.user.findMany({
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
        await prisma.game.deleteMany({
            where: { creatorId: id },
        });

        // Enfin supprime le user
        return prisma.user.delete({
            where: { id },
        });
    }
}

module.exports = new UserService();
