"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLikes = exports.getLikes = void 0;
const data_source_1 = require("../../../data-source");
const likes_1 = require("../../../models/article/likes");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
const isArticle_1 = __importDefault(require("../../../utils/models/isArticle"));
const isUser_1 = __importDefault(require("../../../utils/models/isUser"));
const likesDB = data_source_1.dataSource.getRepository(likes_1.Likes);
const getLikes = async (req, res, next) => {
    const { articleID, userID, } = req.query;
    //validations
    const validationSchema = joi_1.default.object({
        articleID: joi_1.default.string(),
        userID: joi_1.default.string()
    });
    (0, inputValidation_1.default)(req, res, next, validationSchema);
    //verifications
    let getArticle;
    if (articleID) {
        getArticle = await (0, isArticle_1.default)(articleID);
        if (!getArticle)
            return res.status(500).json({
                url: 'src/controllers/article/flags/add',
                error: `invalid articleID`
            });
    }
    let getUser;
    if (userID) {
        getUser = await (0, isUser_1.default)(userID);
        if (!getUser)
            return res.status(500).json({
                url: 'src/controllers/article/flags/add',
                error: `invalid userID`
            });
    }
    //get flags
    try {
        const likes = await likesDB.find({
            where: {
                content: getArticle,
                user: getUser
            },
            relations: ["content", "user"]
        });
        res.status(200).json(likes);
    }
    catch (error) {
        res.status(500).json({
            url: "src/controllers/article/likes/get",
            error: error
        });
    }
};
exports.getLikes = getLikes;
const getAllLikes = async (req, res) => {
    try {
        const likes = await likesDB.find({
            relations: ["content", "user"]
        });
        res.status(200).json(likes);
    }
    catch (error) {
        res.status(500).json({
            url: "src/controllers/article/likes/get",
            error: error
        });
    }
};
exports.getAllLikes = getAllLikes;
//# sourceMappingURL=get.js.map