"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const content_routes_1 = __importDefault(require("./content.routes"));
const add_1 = require("../../controllers/article/comments/add");
const get_1 = require("../../controllers/article/comments/get");
const delete_1 = require("../../controllers/article/comments/delete");
const update_1 = require("../../controllers/article/comments/update");
content_routes_1.default.post("/comments/add", add_1.addComment);
content_routes_1.default.get("/comments/getComment", get_1.getComment);
content_routes_1.default.get("/comments/getAllComments", get_1.getAllComments);
content_routes_1.default.delete("/comments/delete", delete_1.deleteComment);
content_routes_1.default.patch("/comments/update", update_1.updateComment);
exports.default = content_routes_1.default;
//# sourceMappingURL=comments.routes.js.map