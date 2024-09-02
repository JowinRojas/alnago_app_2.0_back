
import { Router } from 'express';
import { createFolder, generatePublicURI } from './googleApi.controller.js';
import multer from 'multer';
const uploadMiddleware = multer({dest: 'src/imagenes/'})
import fs from 'fs';

export const googleApiRouter = Router();

//GET
//http://localhost:4000/google
googleApiRouter.get('/', async (request, response)=>{
    try {
        
        response.json('funca')
    } catch (error) {
        console.log(error)
    }
})

//http://localhost:4000/google/createFolder
googleApiRouter.get('/createFolder', async (request, response)=>{
    try {
        const drive = await createFolder();
        response.json(drive)
    } catch (error) {
        console.log(error)
    }
})


//POST
//http://localhost:4000/google/image
googleApiRouter.post('/image',uploadMiddleware.single('file'), async (request, response)=>{
   
    const { originalname, path } = request.file; 
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    try {
        const uri = await generatePublicURI(newPath)
        response.json(uri)
    } catch (error) {
        console.log(error)
    }
})