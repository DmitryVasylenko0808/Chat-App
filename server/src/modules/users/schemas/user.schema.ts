import mongoose, * as moongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    avatarUrl: String
})