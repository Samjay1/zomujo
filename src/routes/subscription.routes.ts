import express, {Router} from "express";
import { createPlan, initiatePayment } from "../controllers/subscription.controller";

const router: Router = express.Router();

router.post("/create-plan", createPlan);
router.post("/initiate-payment", initiatePayment);

export default router;