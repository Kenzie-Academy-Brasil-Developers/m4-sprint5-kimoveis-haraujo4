import { Router } from "express";
import { createScheduleController, listScheduleController } from "../controllers/scheduleController";

import userAuthMiddleware from "../middlewares/userAuth.middleware";
import userIsAdmMiddleware from "../middlewares/userIsAdm.middleware";


export const schedulesRoutes = Router()

schedulesRoutes.post('', userAuthMiddleware, createScheduleController)
schedulesRoutes.get('/properties/:id', userAuthMiddleware, userIsAdmMiddleware, listScheduleController)