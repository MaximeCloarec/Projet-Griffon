const { validateUser } = require("../Validators/userValidator.js");

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    createUser = async (req, res) => {
        try {
            const { email, password } = validateUser(req.body);

            const user = await this.userService.createUser(email, password);

            res.status(201).json({
                message: "Utilisateur créé avec succès",
                user,
            });
        } catch (error) {
            res.status(400).json({
                message: "Une erreur est survenue avec le serveur",
            });
        }
    }

    loginUser = async (req, res) => {
        try {
            const { email, password } = validateUser(req.body);

            const { user, token } =
                await this.userService.loginUser(email, password);

            res.status(200).json({
                message: "Connexion réussie",
                user,
                token,
            });
        } catch (error) {
            console.log(error);

            res.status(401).json({
                message: "Une erreur est survenue avec le serveur",
            });
        }
    }

    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUser();
            res.json(users);
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: "Une erreur est survenue avec le serveur",
            });
        }
    }

    deleteSelf = async (req, res) => {
        try {
            const userId = req.user.id;

            const deletedUser = await this.userService.deleteUser(userId);

            if (!deletedUser) {
                return res.status(404).json({
                    message: "Utilisateur introuvable.",
                });
            }

            res.status(200).json({
                message: "Compte supprimé avec succès.",
            });
        } catch (error) {
            res.status(500).json({
                message: "Erreur lors de la suppression.",
            });
        }
    }
}

module.exports = UserController;