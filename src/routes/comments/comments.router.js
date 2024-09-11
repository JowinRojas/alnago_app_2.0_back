import { Router } from 'express';
import { createComment, getComments } from './comments.controller.js';

export const commentsRouter = Router();


//Guardar Comentario
////http://localhost:4000/comments/crear
commentsRouter.post("/crear", async (request, response) => {
    const { text } = request.body;
    try {
        await createComment(text)
        response.status(200).send('comentario creado')
    } catch(error) {
        console.log(error)
    }
})



//Mostrar comentarios
////http://localhost:4000/comments
commentsRouter.get("/", async (request, response) => {
    try {
        const comentarios = await getComments();
        response.status(200).send(comentarios)
    } catch(error) {
        console.log(error)
    }
  
})