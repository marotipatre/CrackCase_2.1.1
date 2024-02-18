import express from 'express'
// import { authMiddleware } from '../middleware/auth.js';
import { signUp } from '../controllers/user/signup.controller.js';
import { login } from '../controllers/user/login.controller.js';
import { getUser } from '../controllers/user/getUser.controller.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';
// import updateUser from '../controller/user/student/update.student.controller.js';
export const UserRouter = express.Router();
UserRouter.get('/',authMiddleware,getUser);
UserRouter.post('/signup',signUp);
UserRouter.post('/signin',login);
// router.put("/",authMiddleware,updateUser);
// router.get("/bulk", authMiddleware,getUsers);