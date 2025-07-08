const express = require("express");
const User = require("../models/User");

module.exports = (app) => {
    const router = express.Router();
    router.post("/register", async (req, res) => {
        const { username, email, password } = req.body;
        const newUser = new User({
            username,
            email,
            password,
        });
        try {
            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password, // Need hashing
                },
            });
        } catch (error) {
            res.status(500).json({
                content: req.body,
                message: "Error registering user",
                error: error.message,
            });
        }
    });

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
