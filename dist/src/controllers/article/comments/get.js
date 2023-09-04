"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllComments = exports.getComment = void 0;
const data_source_1 = require("../../../data-source");
const comments_1 = require("../../../models/article/comments");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
const isArticle_1 = __importDefault(require("../../../utils/models/isArticle"));
const isUser_1 = __importDefault(require("../../../utils/models/isUser"));
const commentDB = data_source_1.dataSource.getRepository(comments_1.Comments);
const getComment = async (req, res, next) => {
    const { id, articleID, userID, } = req.query;
    //validations
    const validationSchema = joi_1.default.object({
        id: joi_1.default.string(),
        articleID: joi_1.default.string(),
        userID: joi_1.default.string()
    });
    (0, inputValidation_1.default)(req, res, next, validationSchema);
    let checkArticle;
    if (articleID) {
        checkArticle = await (0, isArticle_1.default)(articleID);
        if (!checkArticle)
            return res.status(500).json({
                url: 'src/controllers/article/content/add',
                error: `invalid userID`
            });
    }
    const checkUser = await (0, isUser_1.default)(userID);
    if (!checkArticle)
        return res.status(500).json({
            url: 'src/controllers/article/content/add',
            error: `invalid userID`
        });
    try {
        const comment = await commentDB.findOne({
            where: {
                id: id,
                user: checkUser
            },
        });
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(500).json({
            url: "src/controllers/article/comments/get",
            error: error
        });
    }
};
exports.getComment = getComment;
const getAllComments = async (req, res) => {
    try {
        const comments = await commentDB.find({
            relations: ["content", "user"]
        });
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({
            url: "src/controllers/article/comments/get",
            error: error
        });
    }
};
exports.getAllComments = getAllComments;
//# sourceMappingURL=get.js.map