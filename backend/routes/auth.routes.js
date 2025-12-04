import express, { Router } from 'express'    //import express
import { login, logout, signUp } from '../controllers/auth.controllers.js';
import { upload } from '../middlewares/multer.js';



const authRouter = Router();  //need only Router fn


// Use lowercase '/signup' so it matches the frontend POST path (/api/signup)

authRouter.post("/signup", upload.single("profileImage"), signUp ) // this uplaod is a middleware used for a particular route
authRouter.post("/login", login )
authRouter.post("/logout", logout)
























export default authRouter;