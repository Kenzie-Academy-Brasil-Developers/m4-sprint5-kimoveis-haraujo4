import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import { IUserLogin } from "../interfaces/users";
import userLoginService from "../services/login/userLogin.services";

export const userLoginController = async (req: Request, res: Response) => {
    try {
        
        const { email, password }: IUserLogin = req.body
        const token = await userLoginService({ email, password })

        return res.status(200).json({ token })

    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
    }
}