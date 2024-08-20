
import express from 'express';
export const server = express();
import morgan from 'morgan';
import { googleApiRouter } from './routes/googleApi.router.js';
import { pruebaRouter } from './routes/prueba.router.js';

// const cors = require('cors');
// const cookieParser = require('cookie-parser');
//const bcrypt = require('bcryptjs');
// server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// server.use(bodyParser.json({ limit: '50mb' }));

server.use(morgan('dev'));
server.use('/google', googleApiRouter);
server.use('/prueba', pruebaRouter);
// server.use(express.json());
// server.use(cookieParser());

// //CORSs
// server.use(cors({
//     credentials:true,
//     origin:'http://localhost:4321',
// }));


