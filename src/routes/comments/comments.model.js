import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CommentsSchema = new Schema({    
    text: {
        type: String,
        require: true,
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
})

export const CommentsModel = model('Comment', CommentsSchema);

