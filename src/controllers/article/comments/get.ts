import { Response, Request, NextFunction } from "express";
import { dataSource } from "../../../data-source";
import { Comments } from "../../../models/article/comments";
import Joi from "joi";
import inputValidation from "../../../utils/inputValidation";
import isArticle from "../../../utils/models/isArticle";
import isUser from "../../../utils/models/isUser";
import { User } from "../../../models/user";

const commentDB = dataSource.getRepository(Comments)
const getComment = async (req: Request, res: Response, next : NextFunction) => {
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

    let checkArticle;
    if(articleID){
        checkArticle = await isArticle(articleID as string)
        if(!checkArticle) return res.status(500).json({
            url : 'src/controllers/article/content/add',
            error : `invalid userID`
        })
    }
    
    const checkUser = await isUser(userID as string)
    if(!checkArticle) return res.status(500).json({
        url : 'src/controllers/article/content/add',
        error : `invalid userID`
    })

    try {
        const comment = await commentDB.findOne({
            where: {
                id : id as string,
                user : checkUser as User
            },
        });
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({
            url : "src/controllers/article/comments/get",
            error : error
        })
    }

}

const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await commentDB.find(
            {
                relations : ["content", "user"]
            }
        );
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({
            url : "src/controllers/article/comments/get",
            error : error
        })
    }
}

export { getComment, getAllComments}