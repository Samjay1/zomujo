"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = void 0;
const data_source_1 = require("../../../data-source");
const content_1 = require("../../../models/article/content");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
require('dotenv').config();
const contentDB = data_source_1.dataSource.getRepository(content_1.Content);
const deleteContent = async (req, res, next) => {
    try {
        //get values
        const { id } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            id: joi_1.default.string().required()
        });
        (0, inputValidation_1.default)(req, res, next, validationSchema);
        //delete record
        const deleteArticle = await contentDB.delete(id);
        //check if delete
        if (deleteArticle.affected && deleteArticle.affected > 0)
            return res.status(201).send("record deleted successfully");
        return res.status(400).send('article not found');
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/content/delete",
            error: error
        });
    }
};
exports.deleteContent = deleteContent;
//# sourceMappingURL=delete.js.map