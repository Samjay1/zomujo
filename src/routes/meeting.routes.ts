import express, { Router } from "express";
import { createMeeting } from "../controllers/meeting.controller";

const router: Router = express.Router();

router.post("/create-meeting", createMeeting);

export default router;