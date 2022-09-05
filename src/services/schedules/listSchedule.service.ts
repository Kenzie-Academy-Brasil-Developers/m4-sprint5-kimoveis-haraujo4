import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";
/* import { Schedule } from "../../entities/schedule.entity"; */
import { AppError } from "../../errors/appError";


const listScheduleService = async (propertyId: any ) => {

    const propertiesRepository = AppDataSource.getRepository(Property)
/*     const schedulesRepository = AppDataSource.getRepository(Schedule) */

    const schedulesProperties = await propertiesRepository.findOne({
        where: {
            id: propertyId
        },
        relations: {
            schedules: true
        }
    })

    /* const properties = await propertiesRepository.find()

    const propertiesSchedules = properties.find((property) => property.id === propertyId) */

    if(!schedulesProperties){
        throw new AppError(404, 'Property not found')
    }

    

    return schedulesProperties.schedules

}

export default listScheduleService