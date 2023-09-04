"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = void 0;
const data_source_1 = require("../../../data-source");
const categories_1 = require("../../../models/article/categories");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
require('dotenv').config();
const updateCategory = async (req, res, next) => {
    try {
        const categoryDB = data_source_1.dataSource.getRepository(categories_1.Category);
        //get values
        const { id, name } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            id: joi_1.default.string().required(),
            name: joi_1.default.string().required()
        });
        (0, inputValidation_1.default)(req, res, next, validationSchema);
        //find category
        const category = await categoryDB.findOne({
            where: {
                id: id
            }
        });
        //update category
        if (category) {
            category.name = name;
            await categoryDB.save(category);
            return res.status(201).json(category);
        }
        else {
            res.status(400).send('category not found');
        }
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/category/update",
            error: error
        });
    }
};
exports.updateCategory = updateCategory;
//# sourceMappingURL=update.js.map