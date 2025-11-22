//this is the main core function
import User from "../models/user.model.js";          //use in the search/find
import bcrypt from "bcrypt";

export const signUp = async (req,res)=>{
    try {
        //first take input
        const {firstName, lastName, email, password, userName} = req.body;

        if(!firstName || !lastName || !email || !password || !userName){                //it just for if any user dosnt sent all the details
            return res.status(500).json({message:"internal server error"})

        }
        //second step is password hash, but first check(with help of email or username as they are unique) did the user exist previously or not.
        let existUser = await User.findOne({email})  
        if(existUser) {
            return res.status(400).json({message: "User Already Exist"})
        }

         console.log("incoming body:", req.body);


        //now HASH byusing bcrypt.js  //INSTALL IT after make its func then CREATE a user
        const hashedPassword = await bcrypt.hash(password, 10)  //bcrypt fn 10 is number of random char it will attach in password

        await User.create({
            firstName,
             lastName,
             email,
             password:hashedPassword,
             userName
        })
        return res.status(201).json({user:{     //just to see the reponse on thunder/frontend but we cant show pass so dont use password here
            firstName,
            lastName,
            email,
            userName
        }})


    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }   


}
