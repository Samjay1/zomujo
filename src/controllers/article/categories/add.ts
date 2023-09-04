import e, {Request, Response, NextFunction} from "express";
import {dataSource} from "../../../data-source";
import { Category } from "../../../models/article/categories";
import Joi from "joi"
import inputValidation from "../../../utils/inputValidation";

require('dotenv').config();

const addCategory = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const categoryDB = dataSource.getRepository(Category)
        
        //get values
        const {
            name
        } = req.body
        
        //validations
        const validationSchema = Joi.object({
            name : Joi.string().required()
        })
        inputValidation(req, res, next, validationSchema)
        
        //if name is already available
        const isCategory = await categoryDB.findOne(
            {
                where : {
                    name : name
                }
            }
        )

        //creating content
        if(!isCategory){
            const category = await categoryDB.create({
                name
            })
    
            //check if created
            if (!category) return res.status(400).json('Unable to add category')
    
            //save content
            await categoryDB.save(category)
            return res.status(201).json(category)
        }
        else{
            return res.status(400).json({
                url : "src/controllers/article/category/add",
                error : `name : {{ ${name} }} already exists`
            })
        }
    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/category/add",
            error : error
        })
    }
}

export { addCategory }