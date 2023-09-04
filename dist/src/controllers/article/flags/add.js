"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFlag = void 0;
const data_source_1 = require("../../../data-source");
const flags_1 = require("../../../models/article/flags");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
const isArticle_1 = __importDefault(require("../../../utils/models/isArticle"));
const isUser_1 = __importDefault(require("../../../utils/models/isUser"));
require('dotenv').config();
const flagsDB = data_source_1.dataSource.getRepository(flags_1.Flags);
const addFlag = async (req, res, next) => {
    try {
        //get values
        const { reason, userID, articleID, } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            reason: joi_1.default.string().required(),
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
        const flag = await flagsDB.create({
            content: getArticle,
            user: getUser,
            reason,
            date: new Date()
        });
        //check if created
        if (!flag)
            return res.status(400).json({
                url: 'src/controllers/article/flags/add',
                message: 'Unable to add flag'
            });
        //save content
        await flagsDB.save(flag);
        return res.status(201).json(flag);
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/flags/add",
            error: error
        });
    }
};
exports.addFlag = addFlag;
//# sourceMappingURL=add.js.map