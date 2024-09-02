import { Router } from 'express';
import { createUser, getUserByName } from './user.controller.js';
import bcrypt from "bcryptjs";

export const userRouter = Router();
const salt = bcrypt.genSaltSync(10);

//REGISTRO
////http://localhost:4000/user/register
userRouter.post("/register", async (request, response) => {

    const { username, password, email } = request.body;    
    const passwordHash = bcrypt.hashSync(password, salt);
    const usernameDatabase = await getUserByName({username});

    try {
        if(usernameDatabase){ 
            response.status(200).json("Usuario Ya Existe") 
        } else {
            await createUser({username, password: passwordHash, email})
            response.status(200).json("Usuario Creado con Exito")
        }
    } catch (error) {
        console.log(error)
    }
})


//Login
////http://localhost:4000/user/login
 userRouter.post("/login", async (request, response)=>{

    const {username, password} = request.body;
    const usernameDatabase = await getUserByName({username});
    const passwordCorrect = bcrypt.compareSync(password, usernameDatabase.password);

    try {
        if(passwordCorrect){
            response.json("contrasenha correcta")
        }
    } catch (error) {
        console.log(error)
            response.json("contrasenha incorrecta")
    }
    
 });