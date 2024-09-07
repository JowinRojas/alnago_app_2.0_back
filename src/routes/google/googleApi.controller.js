import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
import { google } from 'googleapis';
const { GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT, REFRESH_TOKEN } = process.env;


const oauth2Client = new google.auth.OAuth2(
    GOOGLE_ID,
    GOOGLE_SECRET, 
    GOOGLE_REDIRECT
)
    
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
        version:'v3',
        auth: oauth2Client
})


//Subir el archivo al drive
export const uploadFile = async (filePath)=>{

    const idCarpeta = await createFolderFecha()
   // const idCarpetaDirecc = await createFolderDireccion()
    try {
        const response = await drive.files.create({
            requestBody:{
                // Este es el nombre con el que se sube el archivo al google drive
                name:'imagenesDeNaruto.jpg',                
                parents: [idCarpeta],
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath)
            },
            fields: 'id',
        });
        
        if(response){
            const eliminar = fs.unlinkSync(filePath)
        } 
        return response

    } catch (error) {
        console.log(error)
    }
}


//Dar permisos y obtener la uri publica de un archivo
export const generatePublicURI = async (filePath)=>{
    const url = await uploadFile(filePath);
    try {
        const fileId = url.data.id
        //configurar los permisos del archivo
        //el await es necesario asi diga que no
        await drive.permissions.create({
            fileId: fileId,
            requestBody:{
                role: 'reader',
                type: 'anyone',
            }
        })
        //el await es necesario asi diga que no
        const result = await drive.files.get({
            fileId: fileId,
            //el content es para que se descargue directamente
            fields: 'webViewLink',
        })
        
        return result.data;

    } catch (error) {
        console.log(error)
    }
}


//CREAR UN FOLDER
export const createFolderFecha = async() => {    
    const fecha = new Date().toString()
    const fileMetadata = {
      name: fecha,
      mimeType: 'application/vnd.google-apps.folder',
    };
    try {
      const file = await drive.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });
      return file.data.id;

    } catch (err) {     
      console.log(err)
    }
  }

  //CREAR UN FOLDER DIRECCION
export const createFolderDireccion = async({name}) => {    
    
    const fileMetadata = {
      name: name,
      mimeType: 'application/vnd.google-apps.folder',
    };
    try {
      const file = await drive.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });
      return file.data.id;

    } catch (err) {     
      console.log(err)
    }
  }