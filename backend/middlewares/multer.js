import multer from "multer"
import fs from "fs"

// Ensure public directory exists
const publicDir = "./public"
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
}

//a storehouse
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{                            //cb is callback its a func that decide the destination 
        cb(null, publicDir)               //its the destination
    },
    filename: (req, file, cb)=>{
        console.log("Multer received file:", file.originalname);

        cb(null, Date.now() + "-" + file.originalname);
        // cb(null, file.originalname)
    }
})

export const upload = multer ({storage})  //middleware
