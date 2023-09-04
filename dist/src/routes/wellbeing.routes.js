"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wellbeing_controller_1 = require("../controllers/wellbeing.controller");
const router = (0, express_1.Router)();
router.get('/questions/:type', wellbeing_controller_1.getQuestions);
router.post('/results', wellbeing_controller_1.getResults);
router.get('/history', wellbeing_controller_1.getUserTestHistory);
exports.default = router;
//# sourceMappingURL=wellbeing.routes.js.map