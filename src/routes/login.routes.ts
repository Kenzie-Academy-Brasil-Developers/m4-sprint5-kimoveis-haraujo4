import { Router } from "express";
import { userLoginController } from "../controllers/loginController";


export const loginRoutes = Router()

loginRoutes.post('', userLoginController)
