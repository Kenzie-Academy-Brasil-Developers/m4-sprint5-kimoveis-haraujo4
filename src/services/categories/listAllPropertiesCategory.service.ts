import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/property.entity";

const listAllPropertiesCategoryService = async (categoryID: string) => {
    
    const categoryRepository = AppDataSource.getRepository(Category)
    const propertiesRepository = AppDataSource.getRepository(Property)

    const categoryProperties = await categoryRepository.findOne({
        where: {
            id: categoryID
        },

        relations: {
            properties: true
        }        
    })

    if(!categoryProperties){
        throw new AppError(404, 'Category not found')
    }

    return categoryProperties
}

export default listAllPropertiesCategoryService