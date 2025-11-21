import {
    describe,
    it,
    expect,
    beforeAll,
    afterAll,
    expectTypeOf,
} from "vitest";
import UserService from "../../src/App/Services/UserService";
import { prismaTest } from "./setup";

beforeAll(async () => {
    UserService.setPrismaClient(prismaTest);
    await prismaTest.$connect();
});

afterAll(async () => {
    await prismaTest.user.deleteMany();
    await prismaTest.$disconnect();
});

describe("UserService.createUser", () => {
    it("Crée un utilisateur en bdd", async () => {
        await UserService.createUser("test@test.com", "Azerty12");

        const exist = await prismaTest.user.findUnique({
            where: { email: "test@test.com" },
        });

        expect(exist).not.toBeNull();
        expect(exist.email).toBe("test@test.com");
    });

    it("Crée un utilisateur en base avec email déja existante", async () => {
        await expect(
            UserService.createUser("test@test.com", "Azerty12")
        ).rejects.toThrow("Ce mail est déja utilisé");
    });
});

describe("UserService.loginUser", () => {
    it("Connecter un utilisateur ", async () => {
        const logged = await UserService.loginUser("test@test.com", "Azerty12");
        expect(logged).toHaveProperty("user");
    });

    it("Refuser la connexion avec email inconnue", async () => {
        await expect(
            UserService.loginUser("test2@test.com", "Azerty12")
        ).rejects.toThrow("Email ou mot de passe incorrect");
    });

    it("Refuser la connexion avec un mot de passe incorrect", async () => {
        await expect(
            UserService.loginUser("test@test.com", "1234567A")
        ).rejects.toThrow("Email ou mot de passe incorrect");
    });
});

describe("UserService.getAllUser", () => {
    it("Récupérer tous les utilisateurs en bdd", async () => {
        const users = await UserService.getAllUser();
        expectTypeOf(users).toBeArray();
    });
});

describe("UserService.deleteUser", () => {
    it("Supprimer un utilisateur", async () => {
        const deleted = await UserService.deleteUser(1);
        expectTypeOf({ deleted }).toBeObject();
    });
});
