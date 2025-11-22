import express from 'express'  
import dotenv from 'dotenv'
import connectDB from './config.js/db.js';           //.js is necessary
dotenv.config()                                      //remember this

let app = express();
let port = process.env.PORT || 4000

app.get("/", (req,res)=>{
    res.send("hellovr ")
})

app.listen(port, ()=>{          
    connectDB()                                         // here pass the the DBconnect fn        
    console.log(`Server is started at ${port}`)       //pass the port
})