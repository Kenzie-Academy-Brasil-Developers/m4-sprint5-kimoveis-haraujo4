import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Category } from "../../entities/category.entity";
import { ICategoryRequest } from "../../interfaces/categories";

const createcCategoryService = async ({ name }: ICategoryRequest) => {
    
    const categoryRepository = AppDataSource.getRepository(Category)
    const categories = await categoryRepository.find()

    const nameAlreadyExists = categories.find((category) => category.name === name)

    if(nameAlreadyExists){
        throw new AppError(400, "Category already exists")
    }  

    const newCategory = new Category()
    newCategory.name = name    

    categoryRepository.create(newCategory)

    await categoryRepository.save(newCategory)

    return newCategory

}

export default createcCategoryService