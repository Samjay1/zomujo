import express, {Router} from "express";
import { createPlan, initiatePayment, paystackWebhook } from "../controllers/subscription.controller";

const router: Router = express.Router();

router.post("/create-plan", createPlan);
router.post("/initiate-payment", initiatePayment);
router.post("/paystack-webhook", paystackWebhook);

export default router;