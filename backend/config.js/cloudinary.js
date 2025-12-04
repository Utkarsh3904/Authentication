import {v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
import fs from "fs"   //for to delete the stored file ie for frontend as the data get stored in backend
//all this is used to store images n videos in backend do this after making signup n login page

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// first we will store file in loal server for frontend then it will send to store in cloudinary for backend storage

const uploadOnCloudinary = async (filepath)=>{
    try {
        if(!filepath){  //agr user ne file upload hi nhi kri
            return null;
        }
        let result = await cloudinary.uploader.upload(filepath)
        console.log(result);                             //to see whats the outcome
        fs.unlinkSync(filepath)              //delete that file
        return result.secure_url                         //cloudinary return a url
        
    } catch (error) {
    if (fs.existsSync(filepath)) {
        try { fs.unlinkSync(filepath) } catch (e) { /* ignore */ }
    }
    console.error('Cloudinary upload error:', error);
    return null;
}
}

export default uploadOnCloudinary
//after this install multer - a middleware 
//multer do as it store the image that comes from the frontend in a disk storage then it goes into cloudinary -> upload -> gives a url -> send it to a database -> Image Uploaded 