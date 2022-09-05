import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Schedule } from "../../entities/schedule.entity";
import { User } from "../../entities/user.entity";
import { Property } from "../../entities/property.entity";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async ({ userId, propertyId, date, hour }: IScheduleRequest)  => {
   
    
    const scheduleRepository = AppDataSource.getRepository(Schedule)
    const userRepository = AppDataSource.getRepository(User)
    const propertyRepository = AppDataSource.getRepository(Property)

    const users = await userRepository.find()
    const user = users.find((user) => user.id === userId)

    if(!user){
        throw new AppError(404, 'User not exists')
    }

    const schedule = await scheduleRepository.find()

    const properties = await propertyRepository.find()
    const property = properties.find((property) => property.id === propertyId)

    if(!property){
        throw new AppError(404, 'Property not exists')
    }

    const scheduleResult = schedule.find((schedule) => schedule)
    const scheduleDate = scheduleResult?.date.toString()
    const scheduleHour = scheduleResult?.hour.toString()

    if(scheduleDate === date && scheduleHour === hour){
        throw new AppError(400, 'User schedule already exists')
    }

    const workSchedule = Number(hour.split(':')[0])

    if(workSchedule >=18 || workSchedule < 8){
        throw new AppError(400, 'Invalid hour')
    }

    const mondayToFriday = new Date(date)
    const numberWeek = mondayToFriday.getDay()

    if(numberWeek === 0 || numberWeek === 6){
        throw new AppError(400, 'Invalid Date')
    }


    const schedules = scheduleRepository.create({
        user: user,
        property: property,
        date,
        hour
    })

    await scheduleRepository.save(schedules)

    return schedules

}

export default createScheduleService