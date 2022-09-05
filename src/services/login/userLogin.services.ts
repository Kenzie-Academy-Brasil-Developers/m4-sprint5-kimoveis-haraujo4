import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const userLoginService = async ({ email, password }: IUserLogin) => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const userLogin = users.find((user) => user.email === email)

    if(!userLogin){
        throw new AppError(403, "Invalid credentials")
    }

    if(!userLogin.isActive){
        throw new AppError(400, 'User is not active')
    }

    const comparePassword = bcrypt.compareSync(password, userLogin.password)

    if(!comparePassword){
        throw new AppError(403, 'Invalid credentials')
    }

    const token = jwt.sign({isAdm: userLogin.isAdm}, process.env.SECRET_KEY as string, {expiresIn: "24h"})

    return token
}

export default userLoginService