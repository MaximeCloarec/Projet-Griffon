const gameSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    roomCode: { type: String, required: true, unique: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    players: [participantSchema],
    assets: [assetSchema],
});

module.exports = mongoose.model("Game", gameSchema);
