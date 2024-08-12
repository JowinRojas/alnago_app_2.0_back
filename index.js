
import app from "./src/app.js";

const { PORT } = process.env;
// const mongoose = require('mongoose');
require("dotenv").config();

const main = async () => {
    try {
        //await mongoose.connect(DATA_BASE_LINK);
        app.listen(PORT, () => {
            console.log("conectado en el puerto" + PORT)
          })
        
    } catch (error) {
        console.log("no se pudo conectar pa", error)
    }
}

main();