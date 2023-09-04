"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategory = void 0;
const data_source_1 = require("../../../data-source");
const categories_1 = require("../../../models/article/categories");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
require('dotenv').config();
const addCategory = async (req, res, next) => {
    try {
        const categoryDB = data_source_1.dataSource.getRepository(categories_1.Category);
        //get values
        const { name } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            name: joi_1.default.string().required()
        });
        (0, inputValidation_1.default)(req, res, next, validationSchema);
        //if name is already available
        const isCategory = await categoryDB.findOne({
            where: {
                name: name
            }
        });
        //creating content
        if (!isCategory) {
            const category = await categoryDB.create({
                name
            });
            //check if created
            if (!category)
                return res.status(400).json('Unable to add category');
            //save content
            await categoryDB.save(category);
            return res.status(201).json(category);
        }
        else {
            return res.status(400).json({
                url: "src/controllers/article/category/add",
                error: `name : {{ ${name} }} already exists`
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/category/add",
            error: error
        });
    }
};
exports.addCategory = addCategory;
//# sourceMappingURL=add.js.map