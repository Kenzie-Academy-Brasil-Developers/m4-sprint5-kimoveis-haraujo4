import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createPropertyService from "../services/properties/createProperty.service";
import listPropertyService from "../services/properties/listProperty.service";

export const createPropertyController = async (req: Request, res: Response) => {

    try {
        
        const { value, size, address: { district, zipCode, number, city, state }, categoryId } = req.body

        const newProperty = await createPropertyService({ value, size, address: { district, zipCode, number, city, state }, categoryId })

        return res.status(201).json(newProperty)

    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }        
    }

}

export const listPropertyController = async (req: Request, res: Response) => {
    try {
        const properties = await listPropertyService()
        return res.status(200).json(properties)

        
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
        
    }
}

