
import { Router } from 'express';

export const pruebaRouter = Router();

//GET
//http://localhost:4000/prueba
pruebaRouter.get('/', async (request, response)=>{
    try {
        response.json("prueba correcta");
    } catch (error) {
        console.log(error)
    }
})