import express from 'express'  
import dotenv from 'dotenv'
import connectDB from './config.js/db.js';           //.js is necessary
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config()                                      //remember this

let app = express();
let port = process.env.PORT || 4000

app.use(express.json())                 //MIDDLEWARE for server to client handle api by converting them into json
app.use(cookieParser())                 //MIDDLEWARE used to store token in cookie
// Configure CORS before routes so preflight requests are handled correctly
app.use(cors({
    origin:"http://localhost:5173",      //frontend url
    credentials:true
}))

app.use("/api", authRouter)            // MIDDLEWARE use authRouter in this


app.listen(port, ()=>{          
    connectDB()                                         // here pass the the DBconnect fn        
    console.log(`Server is started at ${port}`)       //pass the port
})