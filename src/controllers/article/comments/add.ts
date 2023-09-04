import e, {Request, Response, NextFunction} from "express";
import {dataSource} from "../../../data-source";
import { Comments } from "../../../models/article/comments";
import Joi from "joi"
import inputValidation from "../../../utils/inputValidation";
import isArticle from "../../../utils/models/isArticle";
import isUser from "../../../utils/models/isUser";
import { Content } from "../../../models/article/content";

require('dotenv').config();

const addComment = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const commentDB = dataSource.getRepository(Comments)
        
        //get values
        const {
            articleID,
            userID,
            text,
        } = req.body
        
        //validations
        const validationSchema = Joi.object({
            articleID : Joi.string().required(),
            userID : Joi.string().required(),
            text : Joi.string().required()
        })
        inputValidation(req, res, next, validationSchema)

        //isArticle?
        let checkArticle;
        if(articleID){
            checkArticle = await isArticle(articleID as string)
            if(!checkArticle) return res.status(400).json({
                url : 'src/controllers/article/content/add',
                error : `invalid userID`
            })
        }
        let checkUser;
        if(userID){
            checkUser = await isUser(userID as string)
            if(!checkUser) return res.status(400).json({
                url : 'src/controllers/article/content/add',
                error : `invalid userID`
            })
        }

        //creating content
        const comment = await commentDB.create({
            content : checkArticle,
            user : checkUser,
            text,
            date : new Date()
        })

        //check if created
        if (!comment) return res.status(400).json({
            url :'src/controllers/article/comments/add' ,
            message : 'Unable to add comments'
        })

        //save content
        await commentDB.save(comment)
        return res.status(201).json(comment)
    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/comments/add",
            error : error
        })
    }
}

export { addComment }