
import { Router } from 'express';
import { generatePublicURI } from './googleApi.controller.js';
import multer from 'multer';
const uploadMiddleware = multer({dest: 'src/imagenes/'})
import fs from 'fs';

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


//GET
//http://localhost:4000/google/image
googleApiRouter.post('/image',uploadMiddleware.single('file'), async (request, response)=>{
   
    const { originalname, path } = request.file; 
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    try {
        const uri = await generatePublicURI(newPath)
        console.log(uri)
        response.json(uri)
    } catch (error) {
        console.log(error)
    }
})