"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContent = exports.getContent = void 0;
const data_source_1 = require("../../../data-source");
const content_1 = require("../../../models/article/content");
const joi_1 = __importDefault(require("joi"));
const inputValidation_1 = __importDefault(require("../../../utils/inputValidation"));
const isUser_1 = __importDefault(require("../../../utils/models/isUser"));
const isCategory_1 = __importDefault(require("../../../utils/models/isCategory"));
const getContent = async (req, res, next) => {
    try {
        // Validations
        const validationSchema = joi_1.default.object({
            id: joi_1.default.string(),
            title: joi_1.default.string(),
            text: joi_1.default.string(),
            author: joi_1.default.string(),
            category: joi_1.default.array().items({
                id: joi_1.default.string(),
            }),
        });
        (0, inputValidation_1.default)(req, res, next, validationSchema);
        // Get values
        const { id, title, text, author, category } = req.query;
        // Verifications
        let checkUser;
        if (author) {
            checkUser = await (0, isUser_1.default)(author);
            if (!checkUser) {
                return res.status(400).json({
                    url: "src/controllers/article/content/get",
                    error: "author is not a user",
                });
            }
        }
        // Process categories
        const categoryArray = [];
        if (category) {
            if (Array.isArray(category)) {
                for (const cat of category) {
                    const isCategoryData = (input) => {
                        return typeof input === "object" && "id" in input && typeof input.id === "string";
                    };
                    if (isCategoryData(cat)) {
                        const checkCategory = await (0, isCategory_1.default)(cat.id);
                        if (!checkCategory) {
                            return res.status(400).json({
                                url: "src/controllers/article/content/add",
                                error: "category not valid",
                            });
                        }
                        categoryArray.push(checkCategory);
                    }
                }
            }
        }
        // Query the database
        console.log(checkUser, categoryArray);
        const content = await data_source_1.dataSource.getRepository(content_1.Content).find({
            where: {
                id: id,
                category: categoryArray.length > 0 ? categoryArray : undefined,
                author: checkUser,
            },
            relations: ["category", "author"],
        });
        res.status(200).json(content);
    }
    catch (error) {
        res.status(500).json({
            url: "src/controllers/article/content/get",
            error: error || "Internal server error",
        });
    }
};
exports.getContent = getContent;
const getAllContent = async (req, res) => {
    try {
        const content = await data_source_1.dataSource.getRepository(content_1.Content).find({
            relations: ["category", "author"],
        });
        res.status(200).json(content);
    }
    catch (error) {
        res.status(500).json({
            url: "src/controllers/article/content/get",
            error: error || "Internal server error",
        });
    }
};
exports.getAllContent = getAllContent;
//# sourceMappingURL=get.js.map