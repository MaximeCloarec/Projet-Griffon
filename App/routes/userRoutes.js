const express = require("express");
const userController = require("../Controllers/UserController");
const authMiddleware = require("../middlewares/auth");

module.exports = () => {
    const router = express.Router();
    router.post("/register", userController.createUser);

    router.post("/login", userController.loginUser);

    router.delete(
        "/:id",
        userController.deleteUser
    );

    router.get("/", userController.getAllUsers);

    return router;
};
