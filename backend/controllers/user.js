const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ message: "Tous les champs sont requis." });
    }

    try {
        // Vérifie si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: "Un compte existe déjà avec cet email." });
        }

        // Hash le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crée et sauvegarde l'utilisateur
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "Utilisateur créé avec succès.",
            user: {
                id: newUser._id,
                username: newUser.username,
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

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID utilisateur requis." });
    }

    try {
        const user = await User.findByIdAndDelete(id);
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

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exclut le mot de passe des résultats
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

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email et mot de passe requis." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Information de connection incorrect." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "Information de connection incorrect." });
        }

        res.status(200).json({
            message: "Connexion réussie.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
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
