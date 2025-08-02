
const participantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role: { type: String, enum: ["player"], required: true },
    validated: { type: Boolean, default: false },
});

module.exports = participantSchema;
