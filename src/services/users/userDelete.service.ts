import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";

const userDeleteService = async (id: string) => {

    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const deleteUser = users.find((user) => user.id === id)

    
    if(!deleteUser){
        throw new AppError(404, 'User not found')
    }

    if(!deleteUser?.isActive){
        throw new AppError(400, "User Inative")
    }

    deleteUser.isActive = false

    await userRepository.save(deleteUser)
}

export default userDeleteService