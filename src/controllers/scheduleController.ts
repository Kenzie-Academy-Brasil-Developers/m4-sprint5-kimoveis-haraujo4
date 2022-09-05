import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createScheduleService from "../services/schedules/createSchedule.service";
import listScheduleService from "../services/schedules/listSchedule.service";

export const createScheduleController = async (req: Request, res: Response) => {

    try {
        
        const { userId, propertyId, date, hour } = req.body

        const schedules = await createScheduleService({ userId, propertyId, date, hour })

        return res.status(201).json({
            message: "Schedule created"
        })

    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }        
    }

}

export const listScheduleController = async (req: Request, res: Response) => {
    try {

        const { id } = req.params

        const schedules = await listScheduleService(id)
        

        return res.status(200).json({
            schedules 
        })

        
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
        
    }
}