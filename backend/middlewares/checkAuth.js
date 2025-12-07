import jwt from "jsonwebtoken"

//thsi will chk ki cokkie ki ander jo token hai vo expire tho nhi hua aur fir vo jis user ka token hai vo uder ki id return krdega
export const checkAuth = (req,res,next)=>{
    try {
        // jo cookie ke andr token hai usse layenge
        let token = req.cookies.token   //use that particular cookie in which token is stored(that we made)
        if(!token){
            return res.status(401).json({message:"user is not authenticated means usne account nhi bnaya abtk "})

         }
         let decoded = jwt.verify(token, process.env.JWT_SECRET)
        //it will return a id.

        req.userId = decoded.id
        next()

    } catch (error) {
        return res.status(500).json ({message:"internal server error"})
    }
}

