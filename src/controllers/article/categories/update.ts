import e, {Request, Response, NextFunction} from "express";
import {dataSource} from "../../../data-source";
import { Category } from "../../../models/article/categories";
import Joi from "joi"
import inputValidation from "../../../utils/inputValidation";

require('dotenv').config();

const updateCategory = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const categoryDB = dataSource.getRepository(Category)
        
        //get values
        const {
            id,
            name
        } = req.body
        
        //validations
        const validationSchema = Joi.object({
            id : Joi.string().required(),
            name : Joi.string().required()
        })
        inputValidation(req, res, next, validationSchema)
        
        //find category
        const category = await categoryDB.findOne({
            where : {
                id : id
            }
        })

        //update category
        if (category) {
            category.name = name
            await categoryDB.save(category)
            return res.status(201).json(category)
        }
        else{
            res.status(400).send('category not found')
        }


    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/category/update",
            error : error
        })
    }
}

export { updateCategory }