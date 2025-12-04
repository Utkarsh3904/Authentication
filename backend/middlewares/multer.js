import multer from "multer"

//a storehouse
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{                            //cb is callback its a func that decide the destination 
        cb(null, "./public" )               //its the destination
    },
    filename: (req, file, cb)=>{
        console.log(file);
            
        cb(null, file.originalname)
    }
})

export const upload = multer ({storage})  //middleware