import { Router } from 'express';
import { googleApiRouter } from './google/googleApi.router.js';
import { userRouter } from './usuarios/user.router.js';
import { commentsRouter } from './comments/comments.router.js';


export const router = Router();

//http://localhost:4000/google
router.use('/google', googleApiRouter);

//http://localhost:4000/user
router.use('/user', userRouter);

//http://localhost:4000/comments
router.use('/comments', commentsRouter);

