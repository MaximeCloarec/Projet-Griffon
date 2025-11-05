const express = require("express");
const userController = require("../Controllers/UserController");
const authMiddleware = require("../middlewares/auth");

const userRoutes = () => {
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
module.exports = userRoutes;
