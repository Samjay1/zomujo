import e, {NextFunction, Request, Response} from "express";
import {dataSource} from "../../../data-source";
import { Content } from "../../../models/article/content";
import Joi from "joi";
import inputValidation from "../../../utils/inputValidation";
import isCategory from "../../../utils/models/isCategory";
import isUser from "../../../utils/models/isUser";
import { Category } from "../../../models/article/categories";

require('dotenv').config();

const contentDB = dataSource.getRepository(Content)
export const addContent = async (req: Request, res: Response, next : NextFunction) => {
    try {        
        //get values
        const {
            title, text, author, category
        } = req.body
        
        //validations
        const validationSchema = Joi.object({
            title : Joi.string().required(),
            text : Joi.string().required(),
            author : Joi.string().required(),
            category : Joi.array().items({
                id : Joi.string().required()
            }).required()
        })
        inputValidation(req, res, next, validationSchema)

        //check category
        const getUser = await isUser(author)
        if(!getUser) return res.status(500).json({
            url : 'src/controllers/article/content/add',
            error : `invalid userID`
        })
        let categoryArray : Category[] = []
        for(let cat of category){
            const checkCategory = await isCategory(cat.id)
            if(!checkCategory) return res.status(500).json({
                url : "src/controllers/article/content/add",
                error : "category not valid"
            })
            categoryArray.push(checkCategory)
        }

        //creating content
        const content = await contentDB.create({
            title, text, date : new Date(), 
            author : getUser, 
            category : categoryArray
        })

        //check if created
        if (!content) return res.status(400).send('Unable to add article')

        //save content
        await contentDB.save(content)
        return res.status(201).json(content)
    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/content//add",
            error : error
        })
    }
}