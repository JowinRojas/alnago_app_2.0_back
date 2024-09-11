import { CommentsModel } from "./comments.model.js";

export const createComment = async ( text )=> {
    const newComment = await CommentsModel.create({
        text
    })
    return newComment.toJSON();
}

export const getComments = async ()=>{
    const comentarios = await CommentsModel.find({})
    return comentarios;
}