import { Router } from "express";
import { userCreateController, userDeleteController, usersListController } from "../controllers/userController";
import userAuthMiddleware from "../middlewares/userAuth.middleware";
import userIsAdmMiddleware from "../middlewares/userIsAdm.middleware";

export const userRoutes = Router()

userRoutes.post('', userCreateController)
userRoutes.get('', userAuthMiddleware, userIsAdmMiddleware,usersListController)
userRoutes.delete('/:id', userAuthMiddleware, userIsAdmMiddleware, userDeleteController)