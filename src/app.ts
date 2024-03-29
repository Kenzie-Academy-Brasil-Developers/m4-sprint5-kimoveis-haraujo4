import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { router } from "./routes/router"
import { errorMiddleware } from "./middlewares/error.middleware"

const app = express()
app.use(express.json())

app.use('',router)
app.use(errorMiddleware)



export default app