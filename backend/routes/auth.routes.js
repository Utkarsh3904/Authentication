import express, { Router } from 'express'    //import express
import { signUp } from '../controllers/auth.controllers.js';



const authRouter = Router();  //need only Router fn


authRouter.post("/signUp", signUp )
























export default authRouter;