import {Request, Response} from "express";
import {dataSource} from "../data-source";
import {Therapist} from "../models/therapist";
import bcrypt from "bcryptjs";
import {SALT, SECRET} from "../utils/constants";
import jwt from "jsonwebtoken";

require('dotenv').config()

export const signup = async (req: Request, res: Response) => {
    try {
        const therapist = dataSource.getRepository(Therapist)
            .create({
                ...<Array<string>>req.body,
                password: bcrypt.hashSync(req.body.password, SALT)
            })

        if (!therapist) return res.status(400).send('Bad Request')

        await dataSource.getRepository(Therapist).save(therapist)

        return res.status(201).send(therapist)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const therapist = await dataSource.getRepository(Therapist)
            .findOneBy({
                email: req.body.email
            })

        if (!therapist) return res.status(404).send("Invalid Credentials")

        const isPasswordValid = bcrypt.compareSync(req.body.password, therapist.password)

        if (!isPasswordValid) return res.status(404).send("Invalid Credentials")

        // valid login

        const token = jwt.sign({id: therapist.id}, SECRET, {
            expiresIn: 5184000
        })

        return res.status(200).send({
            ...therapist,
            token: token,
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const getTherapistInformation = async (req: Request, res: Response) => {
    try {
        const therapist = await dataSource.getRepository(Therapist).findOneBy({
            id: req.params.id
        })

        if (!therapist) return res.status(404).send("User not found")

        return res.status(200).send({...therapist})
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const updateTherapistData = async (req: Request, res: Response) => {
    try {
        const therapist = await dataSource.getRepository(Therapist).findOneBy({
            id: req.params.id
        })

        if (!therapist) return res.status(404).send("User not found")

        const updateData = req.body

        const updatedTherapist = await dataSource.getRepository(Therapist)
            .save({
                id: therapist.id,
                ...updateData
            })

        return res.status(200).send(updatedTherapist)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const updateTherapistProfile = async (req: Request, res: Response) => {
    try {
        const therapist = await dataSource.getRepository(Therapist).findOneBy({
            id: req.params.id
        })

        if (!therapist) return res.status(404).send("User not found")

        const updateProfileData = req.body

        const updatedProfile = await dataSource.getRepository(Therapist)
            .save({
                id: therapist.id,
                ...updateProfileData
            })

        return res.status(200).send(updatedProfile)
    } catch (error) {
        return res.status(500).send(error)
    }
}