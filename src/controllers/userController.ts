import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import userCreateService from "../services/users/userCreate.service";
import userDeleteService from "../services/users/userDelete.service";
import usersListService from "../services/users/usersList.service";

export const userCreateController = async (req: Request, res: Response) => {
    try {

        const { name, email, password, isAdm } = req.body
        const user = await userCreateService({ name, email, password, isAdm })

        return res.status(201).json(instanceToPlain(user))
        
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
        
    }
}

export const userDeleteController = async (req: Request, res: Response) => {
    try {

        const { id } = req.params

        const deletedUser = await userDeleteService(id)

        return res.status(204).json(deletedUser)
        
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
        
    }
}

export const usersListController = async (req: Request, res: Response) => {
    try {
        const user = await usersListService()
        return res.status(201).json(user)
        
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
        
    }
}
