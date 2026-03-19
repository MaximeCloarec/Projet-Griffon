import {
    describe,
    it,
    expect,
    beforeAll,
    afterAll,
} from "vitest";

const { prismaTest } = require("./setup");
const { UserService } = require("../../src/App/Services/UserService");

let userService;

beforeAll(async () => {
    userService = new UserService(prismaTest);
});

afterAll(async () => {
    await prismaTest.user.deleteMany();
});

describe("UserService.createUser", () => {
    it("Crée un utilisateur", async () => {
        const user = await userService.createUser(
            "test@test.com",
            "Azerty12"
        );

        expect(user.email).toBe("test@test.com");
    });

    it("Refuse email déjà utilisé", async () => {
        await expect(
            userService.createUser("test@test.com", "Azerty12")
        ).rejects.toThrow("Ce mail est déja utilisé");
    });
});

describe("UserService.loginUser", () => {
    it("Connecte un utilisateur", async () => {
        const result = await userService.loginUser(
            "test@test.com",
            "Azerty12"
        );

        expect(result).toHaveProperty("user");
        expect(result).toHaveProperty("token");
    });

    it("Refuse email inconnu", async () => {
        await expect(
            userService.loginUser("nope@test.com", "Azerty12")
        ).rejects.toThrow("Email ou mot de passe incorrect");
    });

    it("Refuse mauvais mdp", async () => {
        await expect(
            userService.loginUser("test@test.com", "wrong")
        ).rejects.toThrow("Email ou mot de passe incorrect");
    });
});

describe("UserService.getAllUser", () => {
    it("Retourne des utilisateurs", async () => {
        const users = await userService.getAllUser();

        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThan(0);
    });
});

describe("UserService.deleteUser", () => {
    it("Supprime un utilisateur", async () => {
        const user = await userService.createUser(
            "delete@test.com",
            "Azerty12"
        );

        const deleted = await userService.deleteUser(user.id);

        expect(deleted.id).toBe(user.id);
    });
});