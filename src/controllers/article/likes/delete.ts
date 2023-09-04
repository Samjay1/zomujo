import e, {Request, Response, NextFunction} from "express";
import {dataSource} from "../../../data-source";
import { Likes } from "../../../models/article/likes";
import Joi from "joi"
import inputValidation from "../../../utils/inputValidation";

require('dotenv').config();

const likesDB = dataSource.getRepository(Likes)
const deleteLikes = async (req: Request, res: Response, next : NextFunction) => {
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
        const deleteLike = await likesDB.delete(id)

        //check if delete
        if (deleteLike.affected && deleteLike.affected > 0) 
        return res.status(201).send("record deleted successfully")
        return res.status(400).send('like not found')

    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/flags/delete",
            error : error
        })
    }
}

export { deleteLikes }