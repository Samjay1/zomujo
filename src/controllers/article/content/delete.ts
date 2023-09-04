import {Request, Response, NextFunction} from "express";
import {dataSource} from "../../../data-source";
import { Content } from "../../../models/article/content";
import Joi from "joi"
import inputValidation from "../../../utils/inputValidation";

require('dotenv').config();

const contentDB = dataSource.getRepository(Content)
const deleteContent = async (req: Request, res: Response, next : NextFunction) => {
    try { 
        //get values
        const {
            id
        } = req.body
        
        //validations
        const validationSchema = Joi.object({
            id : Joi.string().required()
        })
        inputValidation(req, res, next, validationSchema)
        
        //delete record
        const deleteArticle = await contentDB.delete(id)

        //check if delete
        if (deleteArticle.affected && deleteArticle.affected > 0) 
        return res.status(201).send("record deleted successfully")
        return res.status(400).send('article not found')

    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/content/delete",
            error : error
        })
    }
}

export { deleteContent }