const express = require("express");
const userController = require("../controllers/user");

module.exports = () => {
    const router = express.Router();
    router.post("/register", userController.createUser);

    router.post("/login", userController.loginUser);

    router.delete("/user/:id", userController.deleteUser);

    router.get("/users", userController.getAllUsers);

    router.get("/user/:id", userController.getUserById);

    return router;
};
