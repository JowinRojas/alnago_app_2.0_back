
import express from 'express';
export const server = express();
import morgan from 'morgan';

// const morgan = require('morgan');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
//const bcrypt = require('bcryptjs');

//MIDDLEWARES - de henry
// server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// server.use(bodyParser.json({ limit: '50mb' }));


//MIDDLEWARES - DE FASTZODE
 server.use(morgan('dev'));
// server.use(express.json());
// server.use(cookieParser());

// //CORSs
// server.use(cors({
//     credentials:true,
//     origin:'http://localhost:4321',
// }));