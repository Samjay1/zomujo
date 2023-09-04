"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTherapistProfile = exports.updateTherapistData = exports.getTherapistInformation = exports.signin = exports.signup = void 0;
const data_source_1 = require("../data-source");
const therapist_1 = require("../models/therapist");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../utils/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const signup = async (req, res) => {
    try {
        const therapist = data_source_1.dataSource.getRepository(therapist_1.Therapist)
            .create({
            ...req.body,
            password: bcryptjs_1.default.hashSync(req.body.password, constants_1.SALT)
        });
        if (!therapist)
            return res.status(400).send('Bad Request');
        await data_source_1.dataSource.getRepository(therapist_1.Therapist).save(therapist);
        return res.status(201).send(therapist);
    }
    catch (error) {
        return res.status(500).send(error);
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const therapist = await data_source_1.dataSource.getRepository(therapist_1.Therapist)
            .findOneBy({
            email: req.body.email
        });
        if (!therapist)
            return res.status(404).send("Invalid Credentials");
        const isPasswordValid = bcryptjs_1.default.compareSync(req.body.password, therapist.password);
        if (!isPasswordValid)
            return res.status(404).send("Invalid Credentials");
        // valid login
        const token = jsonwebtoken_1.default.sign({ id: therapist.id }, constants_1.SECRET, {
            expiresIn: 5184000
        });
        return res.status(200).send({
            ...therapist,
            token: token,
        });
    }
    catch (error) {
        return res.status(500).send(error);
    }
};
exports.signin = signin;
const getTherapistInformation = async (req, res) => {
    try {
        const therapist = await data_source_1.dataSource.getRepository(therapist_1.Therapist).findOneBy({
            id: req.params.id
        });
        if (!therapist)
            return res.status(404).send("User not found");
        return res.status(200).send({ ...therapist });
    }
    catch (error) {
        return res.status(500).send(error);
    }
};
exports.getTherapistInformation = getTherapistInformation;
const updateTherapistData = async (req, res) => {
    try {
        const therapist = await data_source_1.dataSource.getRepository(therapist_1.Therapist).findOneBy({
            id: req.params.id
        });
        if (!therapist)
            return res.status(404).send("User not found");
        const updateData = req.body;
        const updatedTherapist = await data_source_1.dataSource.getRepository(therapist_1.Therapist)
            .save({
            id: therapist.id,
            ...updateData
        });
        return res.status(200).send(updatedTherapist);
    }
    catch (error) {
        return res.status(500).send(error);
    }
};
exports.updateTherapistData = updateTherapistData;
const updateTherapistProfile = async (req, res) => {
    try {
        const therapist = await data_source_1.dataSource.getRepository(therapist_1.Therapist).findOneBy({
            id: req.params.id
        });
        if (!therapist)
            return res.status(404).send("User not found");
        const updateProfileData = req.body;
        const updatedProfile = await data_source_1.dataSource.getRepository(therapist_1.Therapist)
            .save({
            id: therapist.id,
            ...updateProfileData
        });
        return res.status(200).send(updatedProfile);
    }
    catch (error) {
        return res.status(500).send(error);
    }
};
exports.updateTherapistProfile = updateTherapistProfile;
//# sourceMappingURL=therapist.controller.js.map