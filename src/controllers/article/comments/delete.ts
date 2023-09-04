import e, {Request, Response, NextFunction} from "express";
import {dataSource} from "../../../data-source";
import { Comments } from "../../../models/article/comments";
import Joi from "joi"
import inputValidation from "../../../utils/inputValidation";

require('dotenv').config();

const deleteComment = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const commentDB = dataSource.getRepository(Comments)
        
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
        const deleteComment = await commentDB.delete(id)

        //check if delete
        if (deleteComment.affected && deleteComment.affected > 0) 
        return res.status(201).send("record deleted successfully")
        return res.status(400).send('comment not found')

    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/category/delete",
            error : error
        })
    }
}

export { deleteComment }