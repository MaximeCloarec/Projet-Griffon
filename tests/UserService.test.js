import { describe, it, expect, vi } from "vitest";
const UserService = require("../App/Services/UserService.js");
import bcrypt from "bcrypt";
//Prisma mock
const prisma = {
    user: {
        findUnique: vi.fn(),
        create: vi.fn(),
    },
};

UserService.prisma = prisma;

describe("UserService.createUser", () => {
    it("Devrait créer un utilisateur si l'email est libre", async () => {
        prisma.user.findUnique.mockResolvedValue(null);
        prisma.user.create.mockResolvedValue({
            id: 1,
            email: "test@exemple.com",
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

    it("devrait refuser un email déjà utilisé", async () => {
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            email: "used@example.com",
        });

        await expect(
            UserService.createUser("used@example.com", "Azerty12")
        ).rejects.toThrow("Ce mail est déja utilisé");
    });
});
