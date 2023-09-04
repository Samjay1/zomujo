import { Content } from "../../models/article/content";
import {dataSource} from "./../../data-source";

const content = dataSource.getRepository(Content)
const isArticle = async (id : string)=>{
        const findArticle = await content.findOne({
            where : {
                id : id
            }
        })
        return findArticle
}

export default isArticle