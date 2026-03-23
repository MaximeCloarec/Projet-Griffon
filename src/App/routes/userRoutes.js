const express = require("express");
const UserController = require("../Controllers/UserController");
const UserService = require("../Services/UserService");
const authMiddleware = require("../middlewares/auth");
const userController = new UserController(UserService)

const userRoutes = () => {
    const router = express.Router();
    router.post("/register", userController.createUser);

    router.post("/login", userController.loginUser);

    router.delete(
        "/me",
        authMiddleware.authenticate,
        userController.deleteSelf
    );

    router.get("/", userController.getAllUsers);

    return router;
};
module.exports = userRoutes;
