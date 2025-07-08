const express = require("express");
const stuffController = require("../controllers/user");


module.exports = (app) => {
    const router = express.Router();
    router.post("/register", stuffController.createUser);

    router.post("/login", async (req, res) => {});

    router.get("/user/:id", async (req, res) => {
        const { id } = req.params;
        res.status(200).json({
            message: "User details retrieved successfully",
            userId: id,
        });
    });

    return router;
};
