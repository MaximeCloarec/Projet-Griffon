import { describe, it, expect } from "vitest";
import { validateUser } from "../App/Validators/userValidator.js";

describe("validateUser", () => {
    it("Valider les données utilisateur correctement", () => {
        const data = { email: "test@test.com", password: "1234567A" };
        const result = validateUser(data);
        expect(result).toEqual(data);
    });

    it("Lancer une erreur si les données sont manquantes", () => {
        expect(() => validateUser(null)).toThrow("Données manquantes.");
    });

    it("Lancer une erreur si l'email ou le mot de passe est manquant", () => {
        expect(() => validateUser({ email: "", password: "1234567A" })).toThrow(
            "Email et mot de passe requis."
        );
        expect(() =>
            validateUser({ email: "test@test.com", password: "" })
        ).toThrow("Email et mot de passe requis.");
    });

    it("Lancer une erreur de format", () => {
        expect(() =>
            validateUser({ email: "invalidemail", password: "1234567A" })
        ).toThrow("Format d'email invalide.");
        expect(() =>
            validateUser({ email: "test@test.com", password: "123" })
        ).toThrow("Format de mot de passe invalide.");
    });
});
