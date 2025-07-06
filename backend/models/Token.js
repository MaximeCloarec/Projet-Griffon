import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
});

export default tokenSchema;