import { describe, it, expect, vi } from "vitest";
const UserService = require("../../src/App/Services/UserService");
import bcrypt from "bcrypt";
const prisma = {
    user: {
        findUnique: vi.fn(),
        create: vi.fn(),
        findMany: vi.fn(),
        delete: vi.fn(),
    },
};

UserService.prisma = prisma;

describe("UserService.createUser", () => {
    it("Créer un utilisateur si l'email est libre", async () => {
        prisma.user.findUnique.mockResolvedValue(null);
        prisma.user.create.mockResolvedValue({
            id: 1,
            email: "test@test.com",
        });
        vi.spyOn(bcrypt, "hash").mockResolvedValue("hashed");

        const user = await UserService.createUser("test@test.com", "1234567A");

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { email: "test@test.com" },
        });
        expect(prisma.user.create).toHaveBeenCalledWith({
            data: { email: "test@test.com", password: "hashed" },
        });
        expect(user.email).toBe("test@test.com");
    });

    it("Refuser un email déjà utilisé", async () => {
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            email: "used@example.com",
        });

        await expect(
            UserService.createUser("used@example.com", "Azerty12")
        ).rejects.toThrow("Ce mail est déja utilisé");
    });
});

describe("UserService.loginUser", () => {
    it("Connecter un utilisateur existant", async () => {
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            email: "test@test.com",
            password: "hashedpassword",
            createdAt: new Date(),
            createdGames: [],
            joinedGames: [],
        });
        vi.spyOn(bcrypt, "compare").mockResolvedValue(true);
        vi.spyOn(require("jsonwebtoken"), "sign").mockReturnValue("token");
        await expect(
            UserService.loginUser("test@test.com", "1234567A")
        ).resolves.toEqual({
            user: {
                id: 1,
                email: "test@test.com",
                createdAt: expect.any(Date),
                createdGames: [],
                joinedGames: [],
            },
            token: "token",
        });
    });
    it("Refuser la connexion avec un email inconnu", async () => {
        prisma.user.findUnique.mockResolvedValue(null);
        await expect(
            UserService.loginUser("test@test.com", "1234567A")
        ).rejects.toThrow("Email ou mot de passe incorrect");
    });

    it("Refuser la connexion avec un mot de passe incorrect", async () => {
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            email: "test@test.com",
            password: "hashedpassword",
            createdAt: new Date(),
            createdGames: [],
            joinedGames: [],
        });
        vi.spyOn(bcrypt, "compare").mockResolvedValue(false);
        await expect(
            UserService.loginUser("test@test.com", "wrongpassword")
        ).rejects.toThrow("Email ou mot de passe incorrect");
    });
});

describe("UserService.getAllUser", () => {
    it("Récupérer tous les utilisateurs sans les mots de passe", async () => {
        prisma.user.findMany.mockResolvedValue([
            {
                id: 1,
                email: "test@test.com",
                createdGames: [],
                joinedGames: [],
            },
            {
                id: 2,
                email: "test2@test.com",
                createdGames: [],
                joinedGames: [],
            },
        ]);
        const users = await UserService.getAllUser();
        expect(prisma.user.findMany).toHaveBeenCalledWith({
            omit: {
                password: true,
            },
            include: {
                createdGames: true,
                joinedGames: true,
            },
        });
        expect(users).toHaveLength(2);
        expect(users[0].email).toBe("test@test.com");
        expect(users[1].email).toBe("test2@test.com");
    });
});

describe("UserService.deleteUser", () => {
    it("Supprimer un utilisateur et ses jeux créés", async () => {
        prisma.game = {
            deleteMany: vi.fn().mockResolvedValue(undefined),
        };
        prisma.user.delete.mockResolvedValue({
            id: 1,
            email: "test@test.com",
        });
        const user = await UserService.deleteUser(1);
        expect(prisma.game.deleteMany).toHaveBeenCalledWith({
            where: { creatorId: 1 },
        });
        expect(prisma.user.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        });
        expect(user.email).toBe("test@test.com");
    });

    it("Supprimer un utilisateur qui n'existe pas", async () => {
        prisma.game = {
            deleteMany: vi.fn().mockResolvedValue(undefined),
        };
        prisma.user.delete.mockRejectedValue(
            new Error("Utilisateur non trouvé")
        );
        await expect(UserService.deleteUser(1)).rejects.toThrow(
            "Utilisateur non trouvé"
        );
        expect(prisma.game.deleteMany).toHaveBeenCalledWith({
            where: { creatorId: 1 },
        });
        expect(prisma.user.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        });
    });
});
