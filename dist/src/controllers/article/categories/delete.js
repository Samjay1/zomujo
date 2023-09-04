"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = void 0;
const data_source_1 = require("../../../data-source");
const categories_1 = require("../../../models/article/categories");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
require('dotenv').config();
const deleteCategory = async (req, res, next) => {
    try {
        const categoryDB = data_source_1.dataSource.getRepository(categories_1.Category);
        //get values
        const { id } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            id: joi_1.default.string().required()
        });
        await (0, inputValidation_1.default)(req, res, next, validationSchema);
        //delete record
        const deleteCategory = await categoryDB.delete(id);
        //check if delete
        if (deleteCategory.affected && deleteCategory.affected > 0)
            return res.status(200).send("record deleted successfully");
        return res.status(400).send('category not found');
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/category/add",
            error: error
        });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=delete.js.map