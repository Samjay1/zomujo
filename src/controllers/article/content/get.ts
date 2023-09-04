import { Response, Request, NextFunction } from "express";
import { dataSource } from "../../../data-source";
import { Content } from "../../../models/article/content";
import Joi from "joi";
import inputValidation from "../../../utils/inputValidation";
import isUser from "../../../utils/models/isUser";
import { Category } from "../../../models/article/categories";
import isCategory from "../../../utils/models/isCategory";

interface CategoryData {
  id: string;
  // Add other properties as needed
}

export const getContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validations
    const validationSchema = Joi.object({
      id: Joi.string(),
      title: Joi.string(),
      text: Joi.string(),
      author: Joi.string(),
      category: Joi.array().items({
        id: Joi.string(),
      }),
    });
    inputValidation(req, res, next, validationSchema);

    // Get values
    const { id, title, text, author, category } = req.query;

    // Verifications
    let checkUser;
    if(author){
        checkUser = await isUser(author as string);
        if (!checkUser) {
            return res.status(400).json({
            url: "src/controllers/article/content/get",
            error: "author is not a user",
            });
        }
    }

    // Process categories
    const categoryArray: Category[] = [];
    if(category){
        if (Array.isArray(category)) {
            for (const cat of category) {
                const isCategoryData = (input: any): input is CategoryData => {
                    return typeof input === "object" && "id" in input && typeof input.id === "string";
                };
    
                if (isCategoryData(cat)) {
                const checkCategory = await isCategory(cat.id);
                if (!checkCategory) {
                    return res.status(400).json({
                    url: "src/controllers/article/content/add",
                    error: "category not valid",
                    });
                }
                categoryArray.push(checkCategory);
                }
            }
        }
    }

    // Query the database
    console.log(checkUser, categoryArray)
    const content = await dataSource.getRepository(Content).find({
      where: {
        id: id as string,
        category: categoryArray.length > 0 ? categoryArray : undefined,
        author: checkUser,
      },
      relations: ["category", "author"],
    });
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({
      url: "src/controllers/article/content/get",
      error: error || "Internal server error",
    });
  }
};

export const getAllContent = async (req: Request, res: Response) => {
  try {
    const content = await dataSource.getRepository(Content).find({
      relations: ["category", "author"],
    });
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({
      url: "src/controllers/article/content/get",
      error: error || "Internal server error",
    });
  }
};
