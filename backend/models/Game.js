import mongoose from "mongoose";
import participantSchema from "./Participant.js";
import assetSchema from "./asset.js";

const gameSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    roomCode: { type: String, required: true, unique: true },
    owner: { type: participantSchema, required: true },
    players: [participantSchema],
    assets: [assetSchema],
});

module.exports = mongoose.model("Game", gameSchema);
