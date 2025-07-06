import mongoose from "mongoose";
import tokenSchema from "./Token.js";

const assetSchema = new mongoose.Schema({
    background: { type: String, required: true },
    tokens: [tokenSchema],
});

export default assetSchema;
