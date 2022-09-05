import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Property } from "../../entities/property.entity";

const listPropertyService = async () => {

    const propertyRepository = AppDataSource.getRepository(Property)
    const properties = await propertyRepository.find()

    if(!properties){
        throw new AppError(404, 'Properties not found')
    }

    return properties
}

export default listPropertyService