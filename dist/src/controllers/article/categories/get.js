"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = exports.getCategory = void 0;
const data_source_1 = require("../../../data-source");
const categories_1 = require("../../../models/article/categories");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
const getCategory = async (req, res, next) => {
    const { id, name } = req.body;
    //validations
    const validationSchema = joi_1.default.object({
        name: joi_1.default.string(),
        id: joi_1.default.string()
    });
    (0, inputValidation_1.default)(req, res, next, validationSchema);
    try {
        const category = await data_source_1.dataSource.getRepository(categories_1.Category).findOne({
            where: {
                id: id,
                name: name
            },
        });
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({
            url: "src/controllers/article/Category/get",
            error: error
        });
    }
};
exports.getCategory = getCategory;
const getAllCategories = async (req, res, next) => {
    //validations
    const validationSchema = joi_1.default.object({
        name: joi_1.default.string(),
        id: joi_1.default.string()
    });
    (0, inputValidation_1.default)(req, res, next, validationSchema);
    try {
        const category = await data_source_1.dataSource.getRepository(categories_1.Category).find();
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({
            url: "src/controllers/article/Category/get",
            error: error
        });
    }
};
exports.getAllCategories = getAllCategories;
//# sourceMappingURL=get.js.map