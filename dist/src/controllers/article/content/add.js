"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addContent = void 0;
const data_source_1 = require("../../../data-source");
const content_1 = require("../../../models/article/content");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
const isCategory_1 = __importDefault(require("../../../utils/models/isCategory"));
const isUser_1 = __importDefault(require("../../../utils/models/isUser"));
require('dotenv').config();
const contentDB = data_source_1.dataSource.getRepository(content_1.Content);
const addContent = async (req, res, next) => {
    try {
        //get values
        const { title, text, author, category } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            title: joi_1.default.string().required(),
            text: joi_1.default.string().required(),
            author: joi_1.default.string().required(),
            category: joi_1.default.array().items({
                id: joi_1.default.string().required()
            }).required()
        });
        (0, inputValidation_1.default)(req, res, next, validationSchema);
        //check category
        const getUser = await (0, isUser_1.default)(author);
        if (!getUser)
            return res.status(500).json({
                url: 'src/controllers/article/content/add',
                error: `invalid userID`
            });
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
        //creating content
        const content = await contentDB.create({
            title, text, date: new Date(),
            author: getUser,
            category: categoryArray
        });
        //check if created
        if (!content)
            return res.status(400).send('Unable to add article');
        //save content
        await contentDB.save(content);
        return res.status(201).json(content);
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/content//add",
            error: error
        });
    }
};
exports.addContent = addContent;
//# sourceMappingURL=add.js.map