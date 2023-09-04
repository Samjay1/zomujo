import e, {Request, Response, NextFunction} from "express";
import {dataSource} from "../../../data-source";
import { Flags } from "../../../models/article/flags";
import Joi from "joi"
import inputValidation from "../../../utils/inputValidation";
import isArticle from "../../../utils/models/isArticle";
import isUser from "../../../utils/models/isUser";

require('dotenv').config();

const flagsDB = dataSource.getRepository(Flags)
const addFlag = async (req: Request, res: Response, next : NextFunction) => {
    try {
        
        //get values
        const {
            reason,
            userID,
            articleID,
        } = req.body
        
        //validations
        const validationSchema = Joi.object({
            reason : Joi.string().required(),
            userID : Joi.string().required(),
            articleID : Joi.string().required()
        })
        inputValidation(req, res, next, validationSchema)

        //verifications?
        const getArticle = await isArticle(articleID)
        const getUser = await isUser(userID)
        if(!getArticle) return res.status(500).json({
            url : 'src/controllers/article/flags/add',
            error : `invalid articleID`
        })
        if(!getUser) return res.status(500).json({
            url : 'src/controllers/article/flags/add',
            error : `invalid userID`
        })

        //creating content
            const flag = await flagsDB.create({
                content : getArticle,
                user : getUser,
                reason,
                date : new Date()
            })
    
            //check if created
            if (!flag) return res.status(400).json({
                url :'src/controllers/article/flags/add' ,
                message : 'Unable to add flag'
            })
    
            //save content
            await flagsDB.save(flag)
            return res.status(201).json(flag)
    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/flags/add",
            error : error
        })
    }
}

export { addFlag }