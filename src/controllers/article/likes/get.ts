import { Response, Request, NextFunction } from "express";
import { dataSource } from "../../../data-source";
import { Likes } from "../../../models/article/likes";
import Joi from "joi";
import inputValidation from "../../../utils/inputValidation";
import isArticle from "../../../utils/models/isArticle";
import isUser from "../../../utils/models/isUser";

const likesDB = dataSource.getRepository(Likes)
const getLikes = async (req: Request, res: Response, next : NextFunction) => {
    const {
        articleID,
        userID,
    } = req.query;

    //validations
    const validationSchema = Joi.object({
        articleID : Joi.string(),
        userID : Joi.string()
    })
    inputValidation(req, res, next, validationSchema)

    //verifications
    let getArticle;
    if(articleID){
        getArticle = await isArticle(articleID as string)
        if(!getArticle) return res.status(500).json({
            url : 'src/controllers/article/flags/add',
            error : `invalid articleID`
        })
    }
    let getUser;
    if(userID){
        getUser = await isUser(userID as string)
        if(!getUser) return res.status(500).json({
            url : 'src/controllers/article/flags/add',
            error : `invalid userID`
        })
    }

    //get flags
    try {
        const likes = await likesDB.find({
            where: {
                content  : getArticle,
                user : getUser
            },
            relations : ["content", "user"]
        });
        res.status(200).json(likes)
    } catch (error) {
        res.status(500).json({
            url : "src/controllers/article/likes/get",
            error : error
        })
    }

}

const getAllLikes = async (req: Request, res: Response) => {
    try {
        const likes = await likesDB.find(
            {
                relations : ["content", "user"]
            }
        );
        res.status(200).json(likes)
    } catch (error) {
        res.status(500).json({
            url : "src/controllers/article/likes/get",
            error : error
        })
    }
}

export { getLikes, getAllLikes}