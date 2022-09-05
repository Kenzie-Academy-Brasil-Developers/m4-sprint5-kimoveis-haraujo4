import { Router } from "express";
import { createcCategoryController, listAllPropertiesCategoryController, listCategoryController } from "../controllers/categoryController";
import userAuthMiddleware from "../middlewares/userAuth.middleware";
import userIsAdmMiddleware from "../middlewares/userIsAdm.middleware";


export const categoriesRoutes = Router()

categoriesRoutes.post('', userAuthMiddleware, userIsAdmMiddleware, createcCategoryController)
categoriesRoutes.get('', listCategoryController)
categoriesRoutes.get('/:id/properties', listAllPropertiesCategoryController)