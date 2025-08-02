
const tokenSchema = require("./Token.js");

const assetSchema = new mongoose.Schema({
    background: { type: String, required: true },
    tokens: [tokenSchema],
});

module.exports = assetSchema;
