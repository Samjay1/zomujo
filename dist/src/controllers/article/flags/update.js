"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFlag = void 0;
const data_source_1 = require("../../../data-source");
const flags_1 = require("../../../models/article/flags");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
require('dotenv').config();
const flagsDB = data_source_1.dataSource.getRepository(flags_1.Flags);
const updateFlag = async (req, res, next) => {
    try {
        //get values
        const { id, reason } = req.body;
        //validations
        const validationSchema = joi_1.default.object({
            id: joi_1.default.string().required(),
            reason: joi_1.default.string()
        });
        (0, inputValidation_1.default)(req, res, next, validationSchema);
        //find category
        const flag = await flagsDB.findOne({
            where: {
                id: id
            }
        });
        //update category
        if (flag) {
            flag.reason = reason;
            await flagsDB.save(flag);
            return res.status(201).json(reason);
        }
        else {
            res.status(400).send('flag not found');
        }
    }
    catch (error) {
        return res.status(500).json({
            url: "src/controllers/article/comments/update",
            error: error
        });
    }
};
exports.updateFlag = updateFlag;
//# sourceMappingURL=update.js.map