import { Router } from "express";
import { createPropertyController, listPropertyController } from "../controllers/propertyController";
import userAuthMiddleware from "../middlewares/userAuth.middleware";
import userIsAdmMiddleware from "../middlewares/userIsAdm.middleware";


export const propertiesRoutes = Router()

propertiesRoutes.post('', userAuthMiddleware, userIsAdmMiddleware, createPropertyController)
propertiesRoutes.get('', listPropertyController)