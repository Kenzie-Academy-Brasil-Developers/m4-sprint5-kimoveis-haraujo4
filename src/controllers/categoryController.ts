import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createcCategoryService from "../services/categories/createCategory.service";
import listAllPropertiesCategoryService from "../services/categories/listAllPropertiesCategory.service";
import listCategoryService from "../services/categories/listCategory.service";


export const createcCategoryController = async (req: Request, res: Response) => {
    try {

        const { name } = req.body
        const category = await createcCategoryService({ name })

        return res.status(201).json(category)
        
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
        
    }
}

export const listAllPropertiesCategoryController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const categoryProperties = await listAllPropertiesCategoryService(id)
        return res.status(200).json(categoryProperties)

        
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
        
    }
}

export const listCategoryController = async (req: Request, res: Response) => {
    try {
        const category = await listCategoryService()
        return res.status(200).json(category)

        
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
        
    }
}