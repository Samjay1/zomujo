import {Request, Response, NextFunction} from "express";
import {dataSource} from "../../../data-source";
import { Flags } from "../../../models/article/flags";
import Joi from "joi"
import inputValidation from "../../../utils/inputValidation";

require('dotenv').config();

const flagsDB = dataSource.getRepository(Flags)
const updateFlag = async (req: Request, res: Response, next : NextFunction) => {
    try {
        //get values
        const {
            id,
            reason
        } = req.body;
    
        //validations
        const validationSchema = Joi.object({
            id : Joi.string().required(),
            reason : Joi.string()
            
        })
        inputValidation(req, res, next, validationSchema)
        
        //find category
        const flag = await flagsDB.findOne({
            where : {
                id : id
            }
        })

        //update category
        if (flag) {
            flag.reason = reason
            await flagsDB.save(flag)
            return res.status(201).json(reason)
        }
        else{
            res.status(400).send('flag not found')
        }


    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/comments/update",
            error : error
        })
    }
}

export { updateFlag }