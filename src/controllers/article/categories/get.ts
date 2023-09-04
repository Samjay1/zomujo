import { Response, Request, NextFunction } from "express";
import { dataSource } from "../../../data-source";
import { Category } from "../../../models/article/categories";
import Joi from "joi";
import inputValidation from "../../../utils/inputValidation";

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    const {
        id,
        name
    } = req.body;

    //validations
    const validationSchema = Joi.object({
        name : Joi.string(),
        id: Joi.string()
    })
    inputValidation(req, res, next, validationSchema)

    try {
        const category = await dataSource.getRepository(Category).findOne({
            where: {
                id : id,
                name : name
            },
        });
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({
            url : "src/controllers/article/Category/get",
            error : error
        })
    }
}

const getAllCategories = async (req: Request, res: Response, next : NextFunction) => {
    //validations
    const validationSchema = Joi.object({
        name : Joi.string(),
        id: Joi.string()
    })
    inputValidation(req, res, next, validationSchema)
    try {
        const category = await dataSource.getRepository(Category).find();
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({
            url : "src/controllers/article/Category/get",
            error : error
        })
    }
}

export { getCategory, getAllCategories}