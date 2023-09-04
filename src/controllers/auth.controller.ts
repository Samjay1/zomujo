import {Request, Response} from "express";
import {dataSource} from "../data-source";
import {User} from "../models/user";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {SALT, SECRET} from "../utils/constants";

require('dotenv').config();

export const signup = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.userName)
            return res.status(400).send('BR')

        const user = await dataSource.getRepository(User).create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, SALT)
        })

        if (!user) return res.status(400).send('Unable to create user')

        await dataSource.getRepository(User).save(user)
        return res.status(201).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await dataSource.getRepository(User).findOneBy({
            email: req.body.email,
        })
        if (!user) return res.status(404).send("Invalid credentials")

        // check password
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) return res.status(404).send("Invalid credentials")

        const token = jwt.sign({id: user.id}, SECRET, {
            expiresIn: 5184000
        })

        return res.status(200).send({
            ...user,
            token: token
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}