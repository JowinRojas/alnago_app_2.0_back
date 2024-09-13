
import { Router } from 'express';
import { createFolderFecha, generatePublicURI, uploadComentarios, uploadFile } from './googleApi.controller.js';
import multer from 'multer';
const uploadMiddleware = multer({dest: 'src/imagenes/'})
import fs from 'fs';
import path from 'path';

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


//POST
//http://localhost:4000/google/images
googleApiRouter.post('/images',uploadMiddleware.array('fotos'), async (request, response)=>{

    const comentarios = request.body.comentarios
    const direccion = request.body.direccion
    const fotos = request.files
    
    const idCarpeta = await createFolderFecha(direccion);
    const yeifet = comentarios.split('@%');
    const data = yeifet.map( hijodeyeifet => `${hijodeyeifet}\n`);
    
    
    fs.writeFileSync('archivo.txt', data.toString());
    const comentariosPath = path.join('archivo.txt');
    console.log(comentariosPath);

    
    if(idCarpeta){
            fotos.map( async foto => {
                const { originalname, path } = foto;
                const parts = originalname.split('.');
                const ext = parts[parts.length - 1];
                const newPath = path+'.'+ext;
                fs.renameSync(path, newPath);
                
                try {
                    await uploadFile(newPath, idCarpeta)
                } catch (error) {
                    console.log(error)
                }
            })
            await uploadComentarios(comentariosPath, idCarpeta)
        }
    
    try {
        
        response.json('imagenes subidas');
    
    } catch (error) {

        console.log(error)
    }
})