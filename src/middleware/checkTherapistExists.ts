/*
* Middleware to check if a therapist exists
* */

import {NextFunction, Request, Response} from "express";
import {dataSource} from "../data-source";
import {Therapist} from "../models/therapist";

export const checkTherapistExists = async (req: Request, res: Response, next: NextFunction) => {
    const user = await dataSource.getRepository(Therapist)
        .findOne({where: {email: req.body.email}})

    if (user) return res.status(409).send('Therapist already exists')

    next()
}