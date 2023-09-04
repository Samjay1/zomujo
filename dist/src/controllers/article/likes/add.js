"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLikes = void 0;
const data_source_1 = require("../../../data-source");
const likes_1 = require("../../../models/article/likes");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
const isArticle_1 = __importDefault(require("../../../utils/models/isArticle"));
const isUser_1 = __importDefault(require("../../../utils/models/isUser"));
require('dotenv').config();
const likesDB = data_source_1.dataSource.getRepository(likes_1.Likes);
const addLikes = async (req, res, next) => {
    try {
        //get values
        const { userID, articleID, } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            userID: joi_1.default.string().required(),
            articleID: joi_1.default.string().required()
        });
        (0, inputValidation_1.default)(req, res, next, validationSchema);
        //verifications?
        const getArticle = await (0, isArticle_1.default)(articleID);
        const getUser = await (0, isUser_1.default)(userID);
        if (!getArticle)
            return res.status(500).json({
                url: 'src/controllers/article/flags/add',
                error: `invalid articleID`
            });
        if (!getUser)
            return res.status(500).json({
                url: 'src/controllers/article/flags/add',
                error: `invalid userID`
            });
        //creating content
        const like = await likesDB.create({
            content: getArticle,
            user: getUser,
            date: new Date()
        });
        //check if created
        if (!like)
            return res.status(400).json({
                url: 'src/controllers/article/likes/add',
                message: 'Unable to add like'
            });
        //save content
        await likesDB.save(like);
        return res.status(201).json(like);
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/likes/add",
            error: error
        });
    }
};
exports.addLikes = addLikes;
//# sourceMappingURL=add.js.map