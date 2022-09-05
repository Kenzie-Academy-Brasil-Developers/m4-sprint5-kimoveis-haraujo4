import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity"; 
import { AppError } from "../../errors/appError";


export const listCategoryService = async () => {
    const categoryRepository = AppDataSource.getRepository(Category)
  
    const category = await categoryRepository.find();

    if(!category){
        throw new  AppError(404, 'Category not found')
    }
    
    return category;
  };

  export default listCategoryService