import {Request, Response, NextFunction} from "express";
import {dataSource} from "../../../data-source";
import { Comments } from "../../../models/article/comments";
import Joi from "joi"
import inputValidation from "../../../utils/inputValidation";

require('dotenv').config();

const commentDB = dataSource.getRepository(Comments)
const updateComment = async (req: Request, res: Response, next : NextFunction) => {
    try {
        //get values
        const {
            id,
            text
        } = req.body
        
        //validations
        const validationSchema = Joi.object({
            id : Joi.string().required(),
            text : Joi.string().required()
        })
        inputValidation(req, res, next, validationSchema)
        
        //find category
        const comment = await commentDB.findOne({
            where : {
                id : id
            }
        })

        //update category
        if (comment) {
            comment.text = text
            await commentDB.save(comment)
            return res.status(201).json(comment)
        }
        else{
            res.status(400).send('comment not found')
        }


    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/comments/update",
            error : error
        })
    }
}

export { updateComment }