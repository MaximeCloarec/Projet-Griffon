const bcrypt = require("bcrypt");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Tous les champs sont requis." });
    }

    try {
        // Vérifie si l'email existe déjà
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: "Un compte existe déjà avec cet email." });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            message: "Utilisateur créé avec succès.",
            user: {
                id: newUser.id,
                email: newUser.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la création de l'utilisateur",
            error: error.message,
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                createdAt: true,
                createdGames: true,
                joinedGames: true,
            },
        }); // Exclut le mot de passe des résultats
        res.status(200).json({
            message: "Liste des utilisateurs récupérée avec succès.",
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des utilisateurs",
            error: error.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(400).json({ message: "ID utilisateur requis." });
    }
    try {
        const user = await prisma.user.delete({
            where: { id: id },
        });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression de l'utilisateur",
            error: error.message,
        });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Vérifie si les champs sont remplis
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email et mot de passe requis." });
    }

    try {
        // Vérifie si l'utilisateur existe
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res
                .status(409)
                .json({ message: "Information de connection incorrect" });
        }

        // Vérifie le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "Information de connection incorrect." });
        }

        // Récupère les informations de l'utilisateur sans le mot de passe
        res.status(200).json({
            message: "Connexion réussie.",
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
                createdGame: user.createdGames,
                joinedGames: user.joinedGames,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la connexion",
            error: error.message,
        });
    }
};
//Need update to use Prisma



exports.getUserById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID utilisateur requis." });
    }

    try {
        const user = await User.findById(id, "-password"); // Exclut le mot de passe des résultats
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json({
            message: "Utilisateur récupéré avec succès.",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur",
            error: error.message,
        });
    }
};
