"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleAppointment = exports.manageAppointment = exports.allAppointmentUser = exports.allAppointmentTherapist = exports.bookAppointment = void 0;
const data_source_1 = require("../data-source");
const appointment_1 = require("../models/appointment");
const therapist_1 = require("../models/therapist");
const user_1 = require("../models/user");
const typeorm_1 = require("typeorm");
const zod_1 = require("zod");
var status;
(function (status) {
    status["accepted"] = "accepted";
    status["pending"] = "pending";
    status["reject"] = "rejected";
})(status || (status = {}));
const appointmentValidator = zod_1.z.object({
    scheduledTime: zod_1.z.string(),
    durationMinutes: zod_1.z.number(),
    additionalInformation: zod_1.z.string().optional(),
    therapistId: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
});
const appointmentUpdateValidator = zod_1.z.object({
    accept: zod_1.z.boolean(),
    id: zod_1.z.string().uuid(),
    therapistId: zod_1.z.string().uuid(),
});
async function bookAppointment(req, res) {
    try {
        const { scheduledTime, durationMinutes, additionalInformation, therapistId, userId, } = req.body;
        // validate appointement
        appointmentValidator.parse({
            scheduledTime,
            durationMinutes,
            additionalInformation,
            therapistId,
            userId,
        });
        // find therapist
        const therapist = await data_source_1.dataSource.manager.findOne(therapist_1.Therapist, {
            where: {
                id: therapistId,
            },
        });
        if (!therapist) {
            return res.status(404).send("Therapist not found");
        }
        // find user
        const user = await data_source_1.dataSource.manager.findOne(user_1.User, {
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const appointment = new appointment_1.Appointment();
        appointment.scheduledTime = new Date(scheduledTime);
        appointment.durationMinutes = durationMinutes;
        appointment.status = status.pending;
        appointment.additionalInformation = additionalInformation;
        appointment.therapist = therapistId;
        appointment.user = userId;
        const createdAppointment = await data_source_1.dataSource
            .getRepository(appointment_1.Appointment)
            .save(appointment);
        res.status(200).send(createdAppointment);
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).send(error.message);
        }
        if (error instanceof zod_1.ZodError) {
            return res.status(400).send(error);
        }
        return res.status(500).send(error);
    }
}
exports.bookAppointment = bookAppointment;
async function allAppointmentTherapist(req, res) {
    try {
        const id = req.query["id"];
        if (!id) {
            return res.status(400).send("Bad Request");
        }
        const therapist = await data_source_1.dataSource.manager.findOne(therapist_1.Therapist, {
            where: {
                id: id,
            },
            relations: {
                appointments: true,
            },
        });
        if (!therapist) {
            return res.status(404).send("Therapist not found");
        }
        res.status(200).send(therapist.appointments);
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).send(error.message);
        }
        return res.status(500).send(error);
    }
}
exports.allAppointmentTherapist = allAppointmentTherapist;
async function allAppointmentUser(req, res) {
    try {
        const id = req.query["id"];
        if (!id) {
            return res.status(400).send("Bad Request");
        }
        const user = await data_source_1.dataSource.manager.findOne(user_1.User, {
            where: {
                id: id,
            },
            relations: {
                appointments: true,
            },
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user.appointments);
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).send(error.message);
        }
        return res.status(500).send(error);
    }
}
exports.allAppointmentUser = allAppointmentUser;
async function manageAppointment(req, res) {
    try {
        const { accept, id, therapistId } = req.body;
        // validate
        appointmentUpdateValidator.parse({ accept, id, therapistId });
        const therapist = await data_source_1.dataSource.manager.findOne(therapist_1.Therapist, {
            where: {
                id: therapistId,
            },
        });
        if (!therapist) {
            return res.status(404).send("Therapist not found");
        }
        const appointment = await data_source_1.dataSource.manager.findOne(appointment_1.Appointment, {
            where: {
                id: id,
            },
        });
        if (!appointment) {
            return res.status(404).send("Appointment not found");
        }
        const updated_appointment = await data_source_1.dataSource.manager.update(appointment_1.Appointment, { id }, {
            status: accept === true ? status.accepted : status.reject,
        });
        res.status(200).send("Status Updated");
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).send(error.message);
        }
        if (error instanceof zod_1.ZodError) {
            return res.status(400).send(error);
        }
        return res.status(500).send(error);
    }
}
exports.manageAppointment = manageAppointment;
async function getSingleAppointment(req, res) {
    try {
        const id = req.query["id"];
        if (!id) {
            res.status(400).send("pass appointment id");
        }
        const found = await data_source_1.dataSource.manager.findOne(appointment_1.Appointment, {
            where: { id: id },
        });
        if (!found) {
            return res.status(404).send("Appointment not found");
        }
        return res.status(200).send(found);
    }
    catch (error) {
        if (error instanceof typeorm_1.QueryFailedError) {
            return res.status(400).send(error.message);
        }
        return res.status(500).send(error);
    }
}
exports.getSingleAppointment = getSingleAppointment;
//# sourceMappingURL=appointment.controller.js.map