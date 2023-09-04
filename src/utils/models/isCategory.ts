import { Category } from "../../models/article/categories";
import {dataSource} from "./../../data-source";

const category = dataSource.getRepository(Category)
const isCategory = async (id : string)=>{
    const findCategory = await category.findOne({
        where : {
            id : id
        }
    })
    return findCategory
}

export default isCategory