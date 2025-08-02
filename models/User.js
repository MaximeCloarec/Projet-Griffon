
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please fill a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    createdGames: [
        {
            type: Schema.Types.ObjectId,
            ref: "Game",
        },
    ],
    joinedGames: [
        {
            type: Schema.Types.ObjectId,
            ref: "Game",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);
