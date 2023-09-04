"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = require("../../controllers/article/categories/get");
const add_1 = require("../../controllers/article/categories/add");
const content_routes_1 = __importDefault(require("./content.routes"));
const delete_1 = require("../../controllers/article/categories/delete");
const update_1 = require("../../controllers/article/categories/update");
content_routes_1.default.post("/category/add", add_1.addCategory);
content_routes_1.default.get("/category/getAllCategories", get_1.getAllCategories);
content_routes_1.default.get("/category/getCategory", get_1.getCategory);
content_routes_1.default.delete("/category/delete", delete_1.deleteCategory);
content_routes_1.default.patch("/category/update", update_1.updateCategory);
exports.default = content_routes_1.default;
//# sourceMappingURL=categories.routes.js.map