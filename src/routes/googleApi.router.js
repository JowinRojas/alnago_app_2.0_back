
import { Router } from 'express';
import { uploadFile } from '../controllers/googleApi.controller.js';

export const googleApiRouter = Router();

//http://localhost:4000/google
googleApiRouter.get('/google', async (request, response)=>{
    try {
        const upload = await uploadFile();
        response.json(upload)
    } catch (error) {
        console.log(error)
    }
})