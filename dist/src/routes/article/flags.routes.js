"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const content_routes_1 = __importDefault(require("./content.routes"));
const add_1 = require("../../controllers/article/flags/add");
const get_1 = require("../../controllers/article/flags/get");
const delete_1 = require("../../controllers/article/flags/delete");
const update_1 = require("../../controllers/article/flags/update");
content_routes_1.default.post("/flags/add", add_1.addFlag);
content_routes_1.default.get("/flags/getFlag", get_1.getFlag);
content_routes_1.default.get("/flags/getAllFlags", get_1.getAllFlags);
content_routes_1.default.delete("/flags/delete", delete_1.deleteFlag);
content_routes_1.default.patch("/flags/update", update_1.updateFlag);
exports.default = content_routes_1.default;
//# sourceMappingURL=flags.routes.js.map