import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { hash } from 'bcryptjs'

const userCreateService = async ({ name, email, password, isAdm }: IUserRequest) => {
    
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const emailAlreadyExists = users.find((user) => user.email === email)

    if(emailAlreadyExists){
        throw new AppError(400, "User already exists")
    }

    const hashedPassword = await hash(password, 10)  

    const newUser = new User()
    newUser.name = name
    newUser.email = email
    newUser.isAdm = isAdm
    newUser.password = hashedPassword
    

    userRepository.create(newUser)

    await userRepository.save(newUser)

    return newUser

}

export default userCreateService