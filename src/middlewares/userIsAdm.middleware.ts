import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { AppError } from "../errors/appError"


const userIsAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if(!authorization){
        throw new AppError(401, "missing token")
    } 

    const token = authorization.split(" ")[1]

    const { isAdm } = jwt.decode(token) as { isAdm: boolean}

    if(!isAdm){
        throw new AppError(403, "User is not adm")
    } 

    next()
}

export default userIsAdmMiddleware 