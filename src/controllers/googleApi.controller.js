import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();
import { google } from 'googleapis';
const { GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT, REFRESH_TOKEN } = process.env;

//const oauth2Client = new google.oauth2( GOOGLE_ID , GOOGLE_SECRET, GOOGLE_REDIRECT, REFRESH_TOKEN)


const oauth2Client = new google.auth.OAuth2(
    GOOGLE_ID,
    GOOGLE_SECRET,
    GOOGLE_REDIRECT
)
    
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
    
    
const filePath = path.join("src/imagenes/", 'mugen.jpg');
const filePath2 = path.join("src/imagenes/",'naruto.jpg');

const drive = google.drive({
        version:'v3',
        auth: oauth2Client
})

export const uploadFile = async ()=>{
    try {

        const response = await drive.files.create({
            requestBody:{
                // Este es el nombre con el que se sube el archivo al google drive
                name:'imagenesDeNaruto.jpg',
                mimeType: 'image/jpg'
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath)
            }
        })

        console.log(response)
        return response

    } catch (error) {
        console.log(error)
    }
}

export const generatePublicURI = async ()=>{
    const url = await uploadFile();
    try {
        const fileId = url.data.id
        //configurar los permisos del archivo
        const urlPublica = await drive.permissions.create({
            fileId: fileId,
            requestBody:{
                role: 'reader',
                type: 'anyone',
            }
        })
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