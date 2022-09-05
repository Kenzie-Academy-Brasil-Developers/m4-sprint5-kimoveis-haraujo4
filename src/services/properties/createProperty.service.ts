import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Property } from "../../entities/property.entity";
import { Address } from "../../entities/address.entity";
import { Category } from "../../entities/category.entity";
import { IPropertyRequest } from "../../interfaces/properties"


const createPropertyService = async ({ value, size, categoryId, address: { city, district, state, zipCode, number } }: IPropertyRequest) => {
    
    const categoryRepository = AppDataSource.getRepository(Category)
    const addressRepository = AppDataSource.getRepository(Address)
    const propertyRepository = AppDataSource.getRepository(Property)

    
    const categoryAlreadyExists = await categoryRepository.findOneBy({ id: categoryId })

    if(!categoryAlreadyExists){
        throw new AppError(404, 'Category not found')
    }

    if(state.length > 2 /* || state.length < 2 */){
        throw new AppError(400, 'Invalid state')
    }

    if(zipCode.length > 8 /* || zipCode.length < 8 */){
        throw new AppError(400, 'Invalid zip code')
    }

    const addresses = await addressRepository.find()

    const addressesAlreadyExists = addresses.find((address) => address.zipCode === zipCode)

    if(addressesAlreadyExists?.number === number){
        throw new AppError(400, 'Address already exists')
    }


/*     const newAddress = new Address()
    newAddress.district = district
    newAddress.zipCode = zipCode
    newAddress.number = number <-- dando erro
    newAddress.city = city
    newAddress.state = state */

    const newAddress = addressRepository.create({ city, district, state, zipCode, number })
    
    await addressRepository.save(newAddress)

    /* const category = await categoryRepository.find()
    const categoryAlreadyExists = category.find((category) => category.id === categoryId) */

    const newProperty = propertyRepository.create({ 
        value,
        createdAt: new Date(),
        updatedAt: new Date(),
        size,
        sold: false,
        address: newAddress,
        category: {
            id: categoryAlreadyExists?.id,
            name: categoryAlreadyExists?.name
        } 
    })

    await propertyRepository.save(newProperty)

    return newProperty
    
}

export default createPropertyService