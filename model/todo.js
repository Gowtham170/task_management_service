import mongoose, { Schema } from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    priority: {type: Boolean, default: false},
    status: {type: Boolean, default: false},
    username: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

const todoModel = mongoose.model('Task', todoSchema);

export default todoModel;

