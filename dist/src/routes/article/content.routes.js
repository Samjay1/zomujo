"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_1 = require("../../controllers/article/content/get");
const add_1 = require("../../controllers/article/content/add");
const router = express_1.default.Router();
router.post("/content/add", add_1.addContent);
router.get("/content/getAllContent", get_1.getAllContent);
router.get("/content/getContent", get_1.getContent);
exports.default = router;
//# sourceMappingURL=content.routes.js.map