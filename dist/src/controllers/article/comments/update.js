"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = void 0;
const data_source_1 = require("../../../data-source");
const comments_1 = require("../../../models/article/comments");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
require('dotenv').config();
const commentDB = data_source_1.dataSource.getRepository(comments_1.Comments);
const updateComment = async (req, res, next) => {
    try {
        //get values
        const { id, text } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            id: joi_1.default.string().required(),
            text: joi_1.default.string().required()
        });
        (0, inputValidation_1.default)(req, res, next, validationSchema);
        //find category
        const comment = await commentDB.findOne({
            where: {
                id: id
            }
        });
        //update category
        if (comment) {
            comment.text = text;
            await commentDB.save(comment);
            return res.status(201).json(comment);
        }
        else {
            res.status(400).send('comment not found');
        }
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/comments/update",
            error: error
        });
    }
};
exports.updateComment = updateComment;
//# sourceMappingURL=update.js.map