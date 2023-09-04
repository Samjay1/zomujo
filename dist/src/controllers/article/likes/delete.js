"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLikes = void 0;
const data_source_1 = require("../../../data-source");
const likes_1 = require("../../../models/article/likes");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
require('dotenv').config();
const likesDB = data_source_1.dataSource.getRepository(likes_1.Likes);
const deleteLikes = async (req, res, next) => {
    try {
        //get values
        const { id } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            id: joi_1.default.string().required()
        });
        (0, inputValidation_1.default)(req, res, next, validationSchema);
        //delete record
        const deleteLike = await likesDB.delete(id);
        //check if delete
        if (deleteLike.affected && deleteLike.affected > 0)
            return res.status(201).send("record deleted successfully");
        return res.status(400).send('like not found');
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/flags/delete",
            error: error
        });
    }
};
exports.deleteLikes = deleteLikes;
//# sourceMappingURL=delete.js.map