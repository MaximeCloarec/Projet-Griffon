const express = require("express");
const userController = require("../controllers/user");

module.exports = (app) => {
    const router = express.Router();
    router.post("/register", userController.createUser);

    router.post("/login", userController.loginUser);

    
    router.delete("/user/:id", userController.deleteUser);
    
    router.get("/users", userController.getAllUsers);
    
    //Plus utile lors de la gestion de game
    router.get("/user/:id", async (req, res) => {
        const { id } = req.params;
        res.status(200).json({
            message: "User details retrieved successfully",
            userId: id,
        });
    });

    return router;
};

