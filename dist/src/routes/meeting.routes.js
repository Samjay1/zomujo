"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const meeting_controller_1 = require("../controllers/meeting.controller");
const router = express_1.default.Router();
router.post("/create-meeting", meeting_controller_1.createMeeting);
exports.default = router;
//# sourceMappingURL=meeting.routes.js.map