import {Request, Response, NextFunction} from "express";
import {dataSource} from "../../../data-source";
import { Content } from "../../../models/article/content";
import Joi from "joi"
import inputValidation from "../../../utils/inputValidation";
import { Category } from "../../../models/article/categories";
import isCategory from "../../../utils/models/isCategory";

require('dotenv').config();

const contentDB = dataSource.getRepository(Content)
const updateContent = async (req: Request, res: Response, next : NextFunction) => {
    try {
        //get values
        const {
            id, text,title, category
        } = req.body
        
        //validations
        const validationSchema = Joi.object({
            id : Joi.string().required(),
            text : Joi.string().required(),
            category : Joi.array().items({
                id : Joi.string().required()
            }).required()
        })
        inputValidation(req, res, next, validationSchema)
        
        //verifications
        let categoryArray : Category[] = []
        for(let cat of category){
            const checkCategory = await isCategory(cat.id)
            if(!checkCategory) return res.status(500).json({
                url : "src/controllers/article/content/add",
                error : "category not valid"
            })
            categoryArray.push(checkCategory)
        }

        //find content
        const content = await contentDB.findOne({
            where : {
                id : id
            }
        })

        //update category
        if (content) {
            content.text = text
            content.title = title
            content.category = categoryArray
            await contentDB.save(content)
            return res.status(201).json(content)
        }
        else{
            res.status(400).send('article not found')
        }


    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/content/update",
            error : error
        })
    }
}

export { updateContent }