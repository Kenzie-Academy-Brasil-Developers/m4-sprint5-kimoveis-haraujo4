import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { AppError } from "../errors/appError"

const userAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    const token = authorization?.split(" ")[1]

    if(!token){
        throw new AppError(401, "Missing authorization token")
    } 

    try {
        const verify = jwt.verify(token, process.env.SECRET_KEY as string)


        if(verify){
            next()  
        } 
        
    } catch(error) {
        throw new AppError(401, "Invalid token")
    }
}

export default userAuthMiddleware