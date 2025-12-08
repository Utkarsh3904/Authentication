//this is the main core function
import generateToken from "../config.js/token.js";
import User from "../models/user.model.js";          //use in the search/find
import bcrypt from "bcrypt";
import uploadOnCloudinary from "../config.js/cloudinary.js"

export const signUp = async (req,res)=>{
    try {
        //first take input
        const {firstName, lastName, email, password, userName} = req.body;

        if(!firstName || !lastName || !email || !password || !userName){                //it just for if any user dosnt sent all the details
            return res.status(400).json({message:"All fields are required"})

        }

        //this is added for the photo uplaod added at the last
          let profileImage = null;
          if(req.file){
              console.log("File received:", req.file);
              profileImage = await uploadOnCloudinary(req.file.path)   // calling it will return a URL
              console.log("Profile image URL:", profileImage);
          } else {
              console.log("No file received in request");
          }
        
        

        //second step is password hash, but first check(with help of email or username as they are unique) did the user exist previously or not.
        let existUser = await User.findOne({email})  
        if(existUser) {
            return res.status(400).json({message: "User Already Exist"})
        }

         console.log("incoming body:", req.body);


        //now HASH byusing bcrypt.js  //INSTALL IT after make its func then CREATE a user
        const hashedPassword = await bcrypt.hash(password, 10)  //bcrypt fn 10 is number of random char it will attach in password

           // Build user object conditionally
           const userData = {
            firstName,
             lastName,
             email,
             password:hashedPassword,
             userName
        }
        
        // Only add profileImage if it exists
        if(profileImage) {
            userData.profileImage = profileImage;
        }

        const user = await User.create(userData)
        console.log("User created:", user);
 //install i jsonwebtoken n cookie-parser
 //token create n pass it into cokkie : as token chks/verfies a user that it is authenticated(logged in or logged out) or not 
         let token = generateToken(user._id);

        // parsing of token in cookie
        res.cookie("token", token,
            { httpOnly: true,
            secure: process.env.NODE_ENV === "production", //for security when proj done in .env it changes to production then this securtiy thing will work
            sameSite : "strict",
            maxAge : 7*24*60*60*1000 
        });

        return res.status(201).json({
            user: {
                firstName,
                lastName,
                email,
                userName,
                profileImage
            },
            
        })

    } catch (error) {
        console.error("SignUp error:", error);
        return res.status(500).json({message:"internal server error", error: error.message})
    }   
}

export const login =async (req,res)=>{
    try {
    const {email,password} = req.body
    const existingUser = await User.findOne({email})
 
    if(!existingUser){
        return res.status(400).json({message: "User Not Found"})
    }
    let match = await bcrypt.compare(password, existingUser.password)
    if(!match){
        return res.status(400).json({message: "Incorrect Password"})
    }

     let token = generateToken(existingUser._id);

        // parsing of token in cookie
        res.cookie("token", token,
            { httpOnly: true,
            secure: process.env.NODE_ENV === "production", //for security when proj done in .env it changes to production then this securtiy thing will work
            sameSite : "strict",
            maxAge : 7*24*60*60*1000 
        });

    return res.status(201).json({
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                userName: existingUser.userName,
                profileImage: existingUser.profileImage
            },
            
        })

    } catch (error) {
        return res.status(500).json({message:"internal server catch error"})
    }
}

// remove that 7d time of cookiefor logout (clear cookie)
export const logout = async (req,res) =>{
    try {
        res.clearCookie("token")   //in " "
        return res.status(200).json({message:"logout successfully"})
    } catch (error) {
        return res.status(500).json({message:"internal server catch error logout fail"})
    }
}


//user ka data get krenge
//middleware -> fetching get user data a middleware works as middle gets request it verfies that the token of the login and compare   with secret key 

export const getUserData = async (req,res )=>{
    try {
        let userId = req.userId
        if(!userId){
            return res.status(400).json({message:"user id is not found"}) 
        }
        let user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"user id is not found"})  
        }
        return res.status(200).json(user)  //returning user 
    } catch (error) {
        return res.status(500).json({message:error})
    }
}