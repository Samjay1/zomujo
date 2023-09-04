"use strict";
/*
* Middleware to check if a therapist exists
* */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTherapistExists = void 0;
const data_source_1 = require("../data-source");
const therapist_1 = require("../models/therapist");
const checkTherapistExists = async (req, res, next) => {
    const user = await data_source_1.dataSource.getRepository(therapist_1.Therapist)
        .findOne({ where: { email: req.body.email } });
    if (user)
        return res.status(409).send('Therapist already exists');
    next();
};
exports.checkTherapistExists = checkTherapistExists;
//# sourceMappingURL=checkTherapistExists.js.map