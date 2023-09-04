"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContent = void 0;
const data_source_1 = require("../../../data-source");
const content_1 = require("../../../models/article/content");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
const isCategory_1 = __importDefault(require("../../../utils/models/isCategory"));
require('dotenv').config();
const contentDB = data_source_1.dataSource.getRepository(content_1.Content);
const updateContent = async (req, res, next) => {
    try {
        //get values
        const { id, text, title, category } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            id: joi_1.default.string().required(),
            text: joi_1.default.string().required(),
            category: joi_1.default.array().items({
                id: joi_1.default.string().required()
            }).required()
        });
        (0, inputValidation_1.default)(req, res, next, validationSchema);
        //verifications
        let categoryArray = [];
        for (let cat of category) {
            const checkCategory = await (0, isCategory_1.default)(cat.id);
            if (!checkCategory)
                return res.status(500).json({
                    url: "src/controllers/article/content/add",
                    error: "category not valid"
                });
            categoryArray.push(checkCategory);
        }
        //find content
        const content = await contentDB.findOne({
            where: {
                id: id
            }
        });
        //update category
        if (content) {
            content.text = text;
            content.title = title;
            content.category = categoryArray;
            await contentDB.save(content);
            return res.status(201).json(content);
        }
        else {
            res.status(400).send('article not found');
        }
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/content/update",
            error: error
        });
    }
};
exports.updateContent = updateContent;
//# sourceMappingURL=update.js.map