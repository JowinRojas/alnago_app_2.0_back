import { Router } from 'express';
import { createUser } from './user.controller.js';

export const userRouter = Router();

// //-----encriptacion----register
// const bcrypt = require('bcryptjs');// npm i bcryptjs
// const salt = bcrypt.genSaltSync(10);

// //----Login----JWT
// const jwt = require('jsonwebtoken')
// require("dotenv").config();
// const { SECRET } = process.env; // Parametro para el token

// //----cokies---
// const cookieParser = require('cookie-parser');
// userRouter.use(cookieParser())



// //TODOS
// userRouter.get('/', async (request, response)=>{   
//     try {
//         const allUsers = await getUsers();
//         response.status(200).send(allUsers);
//     } catch (error) {
//         console.log(error)
//     } 
// })
// //para encontrar el id y asociarle el post
// userRouter.post('/getId', async (request, response)=>{
//     const { name } = request.body;
//     const user = await getUserByName({name})
    
//     try {
//         response.send(user)
//     } catch (error) {   
//         console.log(error)
//     }
// })

//REGISTRO
////http://localhost:4000/user/register
userRouter.post("/register", async (request, response) => {

    console.log(request.body)

    const { username, password, email } = request.body;    
    //const passwordHash = bcrypt.hashSync(password, salt);
    try {
        await createUser({username, password, email})
        response.status(200).json("Usuario Creado con Exito")
    } catch (error) {
        console.log(error)
    }
})


 //LOGIN
 //http://localhost:4000/dosbastardos/user/login
 userRouter.post("/login", async (request, response)=>{

    //Informacion de la request
    const {username, password} = request.body;

    //Buscar el usuario en la base de datos
    const usernameDatabase = await getUserByName({username})

    //--Comparar la password ingresado con la password que esta hash en la base de datos.
    const passwordCorrect = bcrypt.compareSync(password, usernameDatabase.password)

    //--Crear el token para mantener la sesion iniciada
    //--En el payload se puede mandar mucha mas info
    if(passwordCorrect){
        //--El metodo sing, tiene cuatro parametros. Importante leer cada uno. 1.Payload 2. secretKey 3. Options 4.Callback
        jwt.sign({ username, id: usernameDatabase._id }, SECRET , {}, (err, token)=>{
            if(err) throw(err);
            //envio el token como un objeto para que astro lo haga
            response.status(200).json({token})
            //response.status(200).cookie('token', token).json("inicio de sesion correcto")
        })
    } else {
        res.status(400).json('Usuario Incorrecto')
    }
 })



//VERIFICAR EL TOKEN
userRouter.get('/profile', async (request, response)=>{

    const { token }= request.cookies;

    if(token){
        try {
            jwt.verify(token, SECRET, {}, (err, info)=>{
                try {                 
                    return response.status(200).json(info)                    
                } catch (error) {
                    console.log(err)
                    console.log(error)
                }
            })
            
        } catch (error) {
            console.log(error)
        }
    } else {

        response.json('no llego el token')
    }
    
})



//ELIMINAR EL TOKEN
userRouter.post('/logout', (req, res)=>{
    res.cookie('token', '').json('logout correct')
})

