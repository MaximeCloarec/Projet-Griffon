const UserService = require("../Services/UserService.js");
const { validateUser } = require("../Validators/userValidator.js");

class UserController {
    //Créer un utilisateur avec mot de passe et email
    async createUser(req, res) {
        try {
            const { email, password } = validateUser(req.body); //Validation format et existance des champs

            const user = await UserService.createUser(email, password); //Vérification de l'email et création en bdd

            //Validation de la création
            res.status(201).json({
                message: "Utilisateur créé avec succès",
                user,
            });
        } catch (error) {
            //Gestion des erreurs
            res.status(400).json({ message: error.message });
        }
    }

    //Récupération de l'utilisateur en bdd avec son email et mot de passe
    async loginUser(req, res) {
        try {
            const { email, password } = validateUser(req.body); //Validation format et existance des champs

            const { user, token } = await UserService.loginUser(
                email,
                password
            ); //Vérification de l'existence de l'utilisateur et récupération en bdd

            res.status(200).json({
                message: "Connexion réussie",
                user: user,
                token: token,
            });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    //Récupération de tous les utilisateurs en bdd
    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUser();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //Suppression d'un utilisateur par son id
    async deleteUser(req, res) {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({ message: "ID utilisateur requis." });
        }
        try {
            const user = await UserService.deleteUser(id);
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Utilisateur non trouvé." });
            }
            res.status(200).json({
                message: "Utilisateur supprimé avec succès.",
            });
        } catch (error) {
            res.status(500).json({
                message: "Erreur lors de la suppression de l'utilisateur",
                error: error.message,
            });
        }
    }
}

module.exports = new UserController();
