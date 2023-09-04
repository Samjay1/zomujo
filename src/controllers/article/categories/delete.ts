import e, {Request, Response, NextFunction} from "express";
import {dataSource} from "../../../data-source";
import { Category } from "../../../models/article/categories";
import Joi from "joi"
import inputValidation from "../../../utils/inputValidation";

require('dotenv').config();

const deleteCategory = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const categoryDB = dataSource.getRepository(Category)
        
        //get values
        const {
            id
        } = req.body
        
        //validations
        const validationSchema = Joi.object({
            id : Joi.string().required()
        })
        await inputValidation(req, res, next, validationSchema)
        
        //delete record
        const deleteCategory = await categoryDB.delete(id)

        //check if delete
        if (deleteCategory.affected && deleteCategory.affected > 0) 
        return res.status(200).send("record deleted successfully")
        return res.status(400).send('category not found')

    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/category/add",
            error : error
        })
    }
}

export { deleteCategory }