"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Routes for appointment scheduling and management
 * */
const express_1 = __importDefault(require("express"));
const appointment_controller_1 = require("../controllers/appointment.controller");
const router = express_1.default.Router();
router.post("/book", appointment_controller_1.bookAppointment);
router.get("/therapist/all", appointment_controller_1.allAppointmentTherapist);
router.get("/user/all", appointment_controller_1.allAppointmentUser);
router.patch("/manage", appointment_controller_1.manageAppointment);
router.get("/single", appointment_controller_1.getSingleAppointment);
exports.default = router;
//# sourceMappingURL=appointment.routes.js.map