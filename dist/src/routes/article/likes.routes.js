"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const content_routes_1 = __importDefault(require("./content.routes"));
const add_1 = require("../../controllers/article/likes/add");
const get_1 = require("../../controllers/article/likes/get");
const delete_1 = require("../../controllers/article/likes/delete");
content_routes_1.default.post("/likes/add", add_1.addLikes);
content_routes_1.default.get("/likes/getLikes", get_1.getLikes);
content_routes_1.default.delete("/likes/delete", delete_1.deleteLikes);
exports.default = content_routes_1.default;
//# sourceMappingURL=likes.routes.js.map