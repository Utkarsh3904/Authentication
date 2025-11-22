import express from 'express'  
import dotenv from 'dotenv'
import connectDB from './config.js/db.js';           //.js is necessary
import authRouter from './routes/auth.routes.js';
dotenv.config()                                      //remember this

let app = express();
let port = process.env.PORT || 4000

app.use(express.json())                 //MIDDLEWARE for server to client handle api by converting thrme into json
app.use("/api", authRouter)            // MIDDLEWARE use authRouter in this

app.listen(port, ()=>{          
    connectDB()                                         // here pass the the DBconnect fn        
    console.log(`Server is started at ${port}`)       //pass the port
})