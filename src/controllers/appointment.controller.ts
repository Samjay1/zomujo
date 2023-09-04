import {Response, Request} from "express";
import {dataSource} from "../data-source";
import {Appointment} from "../models/appointment";
import {Therapist} from "../models/therapist";
import {User} from "../models/user";
import {QueryFailedError} from "typeorm";
import {z, ZodError} from "zod";

enum status {
    accepted = "accepted",
    pending = "pending",
    reject = "rejected",
}

const appointmentValidator = z.object({
    scheduledTime: z.string(),
    durationMinutes: z.number(),
    additionalInformation: z.string().optional(),
    therapistId: z.string().uuid(),
    userId: z.string().uuid(),
});

const appointmentUpdateValidator = z.object({
    accept: z.boolean(),
    id: z.string().uuid(),
    therapistId: z.string().uuid(),
});

export async function bookAppointment(req: Request, res: Response) {
    try {
        const {
            scheduledTime,
            durationMinutes,
            additionalInformation,
            therapistId,
            userId,
        } = req.body;

        // validate appointement
        appointmentValidator.parse({
            scheduledTime,
            durationMinutes,
            additionalInformation,
            therapistId,
            userId,
        });

        // find therapist
        const therapist = await dataSource.manager.findOne(Therapist, {
            where: {
                id: therapistId,
            },
        });
        if (!therapist) {
            return res.status(404).send("Therapist not found");
        }
        // find user
        const user = await dataSource.manager.findOne(User, {
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const appointment = new Appointment();
        appointment.scheduledTime = new Date(scheduledTime);
        appointment.durationMinutes = durationMinutes;
        appointment.status = status.pending;
        appointment.additionalInformation = additionalInformation;
        appointment.therapist = therapistId;
        appointment.user = userId;

        const createdAppointment = await dataSource
            .getRepository(Appointment)
            .save(appointment);
        res.status(200).send(createdAppointment);
    } catch (error: any) {
        if (error instanceof QueryFailedError) {
            return res.status(400).send(error.message);
        }
        if (error instanceof ZodError) {
            return res.status(400).send(error);
        }
        return res.status(500).send(error);
    }
}

export async function allAppointmentTherapist(req: Request, res: Response) {
    try {
        const id = req.query["id"];
        if (!id) {
            return res.status(400).send("Bad Request");
        }

        const therapist = await dataSource.manager.findOne(Therapist, {
            where: {
                id: id as string,
            },
            relations: {
                appointments: true,
            },
        });
        if (!therapist) {
            return res.status(404).send("Therapist not found");
        }

        res.status(200).send(therapist.appointments);
    } catch (error: any) {
        if (error instanceof QueryFailedError) {
            return res.status(400).send(error.message);
        }
        return res.status(500).send(error);
    }
}

export async function allAppointmentUser(req: Request, res: Response) {
    try {
        const id = req.query["id"];
        if (!id) {
            return res.status(400).send("Bad Request");
        }

        const user = await dataSource.manager.findOne(User, {
            where: {
                id: id as string,
            },
            relations: {
                appointments: true,
            },
        });

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).send(user.appointments);
    } catch (error: any) {
        if (error instanceof QueryFailedError) {
            return res.status(400).send(error.message);
        }
        return res.status(500).send(error);
    }
}

export async function manageAppointment(req: Request, res: Response) {
    try {
        const {accept, id, therapistId} = req.body;

        // validate
        appointmentUpdateValidator.parse({accept, id, therapistId});

        const therapist = await dataSource.manager.findOne(Therapist, {
            where: {
                id: therapistId as string,
            },
        });
        if (!therapist) {
            return res.status(404).send("Therapist not found");
        }

        const appointment = await dataSource.manager.findOne(Appointment, {
            where: {
                id: id,
            },
        });

        if (!appointment) {
            return res.status(404).send("Appointment not found");
        }
        const updated_appointment = await dataSource.manager.update(
            Appointment,
            {id},
            {
                status: accept === true ? status.accepted : status.reject,
            }
        );
        res.status(200).send("Status Updated");
    } catch (error: any) {
        if (error instanceof QueryFailedError) {
            return res.status(400).send(error.message)
        }
        if (error instanceof ZodError) {
            return res.status(400).send(error)
        }
        return res.status(500).send(error);
    }
}

export async function getSingleAppointment(req: Request, res: Response) {
    try {
        const id = req.query["id"];
        if (!id) {
            res.status(400).send("pass appointment id");
        }
        const found = await dataSource.manager.findOne(Appointment, {
            where: {id: id as string},
        });
        if (!found) {
            return res.status(404).send("Appointment not found");
        }

        return res.status(200).send(found);
    } catch (error: any) {
        if (error instanceof QueryFailedError) {
            return res.status(400).send(error.message);
        }
        return res.status(500).send(error);
    }
}
