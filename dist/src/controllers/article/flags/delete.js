"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFlag = void 0;
const data_source_1 = require("../../../data-source");
const flags_1 = require("../../../models/article/flags");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
require('dotenv').config();
const flagsDB = data_source_1.dataSource.getRepository(flags_1.Flags);
const deleteFlag = async (req, res, next) => {
    try {
        //get values
        const { id } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            id: joi_1.default.string().required()
        });
        (0, inputValidation_1.default)(req, res, next, validationSchema);
        //delete record
        const deleteFlag = await flagsDB.delete(id);
        //check if delete
        if (deleteFlag.affected && deleteFlag.affected > 0)
            return res.status(201).send("record deleted successfully");
        return res.status(400).send('comment not found');
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/flags/delete",
            error: error
        });
    }
};
exports.deleteFlag = deleteFlag;
//# sourceMappingURL=delete.js.map