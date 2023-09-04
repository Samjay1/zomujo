"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = void 0;
const data_source_1 = require("../../../data-source");
const comments_1 = require("../../../models/article/comments");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
const isArticle_1 = __importDefault(require("../../../utils/models/isArticle"));
const isUser_1 = __importDefault(require("../../../utils/models/isUser"));
require('dotenv').config();
const addComment = async (req, res, next) => {
    try {
        const commentDB = data_source_1.dataSource.getRepository(comments_1.Comments);
        //get values
        const { articleID, userID, text, } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            articleID: joi_1.default.string().required(),
            userID: joi_1.default.string().required(),
            text: joi_1.default.string().required()
        });
        (0, inputValidation_1.default)(req, res, next, validationSchema);
        //isArticle?
        let checkArticle;
        if (articleID) {
            checkArticle = await (0, isArticle_1.default)(articleID);
            if (!checkArticle)
                return res.status(400).json({
                    url: 'src/controllers/article/content/add',
                    error: `invalid userID`
                });
        }
        let checkUser;
        if (userID) {
            checkUser = await (0, isUser_1.default)(userID);
            if (!checkUser)
                return res.status(400).json({
                    url: 'src/controllers/article/content/add',
                    error: `invalid userID`
                });
        }
        //creating content
        const comment = await commentDB.create({
            content: checkArticle,
            user: checkUser,
            text,
            date: new Date()
        });
        //check if created
        if (!comment)
            return res.status(400).json({
                url: 'src/controllers/article/comments/add',
                message: 'Unable to add comments'
            });
        //save content
        await commentDB.save(comment);
        return res.status(201).json(comment);
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/comments/add",
            error: error
        });
    }
};
exports.addComment = addComment;
//# sourceMappingURL=add.js.map