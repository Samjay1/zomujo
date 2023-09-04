/*
 * Routes for appointment scheduling and management
 * */
import express, { Router } from "express";
import {
  bookAppointment,
  allAppointmentTherapist,
  manageAppointment,
  getSingleAppointment,
  allAppointmentUser,
} from "../controllers/appointment.controller";
const router: Router = express.Router();

router.post("/book", bookAppointment);
router.get("/therapist/all", allAppointmentTherapist);
router.get("/user/all", allAppointmentUser);
router.patch("/manage", manageAppointment);
router.get("/single", getSingleAppointment);

export default router;
