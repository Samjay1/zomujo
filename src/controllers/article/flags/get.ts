import { Response, Request, NextFunction } from "express";
import { dataSource } from "../../../data-source";
import { Flags } from "../../../models/article/flags";
import Joi from "joi";
import inputValidation from "../../../utils/inputValidation";
import isArticle from "../../../utils/models/isArticle";
import isUser from "../../../utils/models/isUser";

const flagsDB = dataSource.getRepository(Flags)
const getFlag = async (req: Request, res: Response, next : NextFunction) => {
    const {
        id,
        articleID,
        userID,
    } = req.query;

    //validations
    const validationSchema = Joi.object({
        id : Joi.string(),
        articleID : Joi.string(),
        userID : Joi.string()
    })
    inputValidation(req, res, next, validationSchema)

    //verifications
    let getArticle
    if(articleID){
        getArticle = await isArticle(articleID as string)
        if(!getArticle) return res.status(500).json({
            url : 'src/controllers/article/flags/add',
            error : `invalid articleID`
        })
    }
    let getUser
    if(userID){
        getUser = await isUser(userID as string)
        if(!getUser) return res.status(500).json({
            url : 'src/controllers/article/flags/add',
            error : `invalid userID`
        })
    }

    //get flags
    try {
        const flag = await flagsDB.find({
            where: {
                id : id as string,
                content  : getArticle,
                user : getUser
            },
            relations : ["content", "user"]
        });
        res.status(200).json(flag)
    } catch (error) {
        res.status(500).json({
            url : "src/controllers/article/flags/get",
            error : error
        })
    }

}

const getAllFlags = async (req: Request, res: Response) => {
    try {
        const flags = await flagsDB.find({
            relations : ["content", "user"]
        });
        res.status(200).json(flags)
    } catch (error) {
        res.status(500).json({
            url : "src/controllers/article/flags/get",
            error : error
        })
    }
}

export { getFlag, getAllFlags}