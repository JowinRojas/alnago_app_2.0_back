
import { Router } from 'express';
import { generatePublicURI } from '../controllers/googleApi.controller.js';

export const googleApiRouter = Router();


//GET
//http://localhost:4000/google
googleApiRouter.get('/', async (request, response)=>{
    try {
        const upload = await generatePublicURI();
        response.json(upload)
    } catch (error) {
        console.log(error)
    }
})