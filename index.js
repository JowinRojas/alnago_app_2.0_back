
import {server} from "./src/app.js";
import dotenv from 'dotenv';
dotenv.config();
const { PORT, DATA_BASE_LINK_REMOTO} = process.env;
import mongoose from "mongoose";

const main = async () => {
    try {
                   
         await mongoose.connect(DATA_BASE_LINK_REMOTO)
        
        server.listen(PORT, () => {
            console.log("conectado en el puerto " + PORT)
          })
        
    } catch (error) {
        console.log("no se pudo conectar pa", error)
    }
}

main();