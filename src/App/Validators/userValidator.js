import { z } from "zod";

const userSchema = z.object({
    email: z.email("Format d'email invalide."),
    password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
        .regex(
            /[A-Z]/,
            "Le mot de passe doit contenir au moins une lettre majuscule.",
        )
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre."),
});

export function validateUser(data) {
    if (!data) {
        throw new Error("Données manquantes.");
    }

    try {
        return userSchema.parse(data);
    } catch (error) {
        throw new Error(error.issues[0].message);
    }
}