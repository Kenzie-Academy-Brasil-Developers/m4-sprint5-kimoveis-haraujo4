import { Router } from "express";
import { userRoutes } from "../routes/user.routes"
import { loginRoutes } from "../routes/login.routes"
import { categoriesRoutes } from "../routes/categories.routes"
import { propertiesRoutes } from "../routes/properties.routes"
import { schedulesRoutes } from "../routes/schedules.routes"


export const router = Router()

router.use('/users', userRoutes)
router.use('/login', loginRoutes)
router.use('/categories', categoriesRoutes)
router.use('/properties', propertiesRoutes)
router.use('/schedules', schedulesRoutes)