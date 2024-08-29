import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({    
    
    username: {
        type: String,
        require: true,
        min: 4, 
        unique: true
    },

    password: {
        type: String,
        required: true,
    }, 

    email: {
        type: String,
        required: true,
        unique: true,
    },

    date: { 
        type: Date, 
        default: Date.now 
    },
})

export const UserModel = model('User', UserSchema)

