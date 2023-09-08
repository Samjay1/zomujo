import express, {Router} from "express";
import { createPlan, initiatePayment, populateDummyData } from "../controllers/subscription.controller";

const router: Router = express.Router();

router.post("/create-plan", createPlan);
router.post("/initiate-payment", initiatePayment);
// router.post("/paystack-webhook", paystackWebhook);
router.post('/populateDummyData', populateDummyData); 

export default router;