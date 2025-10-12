const express = require("express");
const userController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");

module.exports = () => {
    const router = express.Router();
    router.post("/register", userController.createUser);

    router.post("/login", userController.loginUser);

    router.delete("/:id", authMiddleware.authenticate, userController.deleteUser);

    router.get("/", userController.getAllUsers);

    router.get("/:id", userController.getUserById);

    return router;
};
