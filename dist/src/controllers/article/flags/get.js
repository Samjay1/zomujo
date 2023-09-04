"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFlags = exports.getFlag = void 0;
const data_source_1 = require("../../../data-source");
const flags_1 = require("../../../models/article/flags");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
const isArticle_1 = __importDefault(require("../../../utils/models/isArticle"));
const isUser_1 = __importDefault(require("../../../utils/models/isUser"));
const flagsDB = data_source_1.dataSource.getRepository(flags_1.Flags);
const getFlag = async (req, res, next) => {
    const { id, articleID, userID, } = req.query;
    //validations
    const validationSchema = joi_1.default.object({
        id: joi_1.default.string(),
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
        const flag = await flagsDB.find({
            where: {
                id: id,
                content: getArticle,
                user: getUser
            },
            relations: ["content", "user"]
        });
        res.status(200).json(flag);
    }
    catch (error) {
        res.status(500).json({
            url: "src/controllers/article/flags/get",
            error: error
        });
    }
};
exports.getFlag = getFlag;
const getAllFlags = async (req, res) => {
    try {
        const flags = await flagsDB.find({
            relations: ["content", "user"]
        });
        res.status(200).json(flags);
    }
    catch (error) {
        res.status(500).json({
            url: "src/controllers/article/flags/get",
            error: error
        });
    }
};
exports.getAllFlags = getAllFlags;
//# sourceMappingURL=get.js.map