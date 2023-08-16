import bookRouter from './bookRouter'
import express from 'express';
import memberRouter from './memberRoute'
import userRouter from './userRouter'

const router = express.Router();

router.use('/users', userRouter);
router.use('/books', bookRouter);
router.use('/members', memberRouter)

export default router;