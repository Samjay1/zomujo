"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscription_controller_1 = require("../controllers/subscription.controller");
const router = express_1.default.Router();
router.post("/create-plan", subscription_controller_1.createPlan);
router.post("/initiate-payment", subscription_controller_1.initiatePayment);
router.post("/paystack-webhook", subscription_controller_1.paystackWebhook);
exports.default = router;
//# sourceMappingURL=subscription.routes.js.map