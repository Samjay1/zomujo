import e, {Request, Response, NextFunction} from "express";
import {dataSource} from "../../../data-source";
import { Flags } from "../../../models/article/flags";
import Joi from "joi"
import inputValidation from "../../../utils/inputValidation";

require('dotenv').config();

const flagsDB = dataSource.getRepository(Flags)
const deleteFlag = async (req: Request, res: Response, next : NextFunction) => {
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
        const deleteFlag = await flagsDB.delete(id)

        //check if delete
        if (deleteFlag.affected && deleteFlag.affected > 0) 
        return res.status(201).send("record deleted successfully")
        return res.status(400).send('comment not found')

    } catch (error) {
        return res.status(500).json({
            url : "src/controllers/article/flags/delete",
            error : error
        })
    }
}

export { deleteFlag }