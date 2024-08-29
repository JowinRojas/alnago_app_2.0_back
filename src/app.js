
import express from 'express';
export const server = express();
import morgan from 'morgan';
import { router } from './routes/index.js';
import cors from 'cors'

// const cookieParser = require('cookie-parser');
//const bcrypt = require('bcryptjs');
// server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// server.use(bodyParser.json({ limit: '50mb' }));

server.use(morgan('dev'));
server.use(express.json());
// server.use(cookieParser());
//CORSs
server.use(cors({
    credentials:true,
}));

server.use('/', router);

