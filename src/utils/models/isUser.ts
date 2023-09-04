import { User } from "../../models/user";
import {dataSource} from "./../../data-source";

const user = dataSource.getRepository(User)
const isUser = async (id : string)=>{
    if(id){
            const findUser : User | null = await user.findOne({
                where : {
                    id : id
                }
            })
            return findUser
    }
    else{
        return undefined
    }
}

export default isUser