"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const data_source_1 = require("../data-source");
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
require('dotenv').config();
const signup = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.userName)
            return res.status(400).send('BR');
        const user = await data_source_1.dataSource.getRepository(user_1.User).create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: bcryptjs_1.default.hashSync(req.body.password, constants_1.SALT)
        });
        if (!user)
            return res.status(400).send('Unable to create user');
        await data_source_1.dataSource.getRepository(user_1.User).save(user);
        return res.status(201).send(user);
    }
    catch (error) {
        return res.status(500).send(error);
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const user = await data_source_1.dataSource.getRepository(user_1.User).findOneBy({
            email: req.body.email,
        });
        if (!user)
            return res.status(404).send("Invalid credentials");
        // check password
        const passwordIsValid = bcryptjs_1.default.compareSync(req.body.password, user.password);
        if (!passwordIsValid)
            return res.status(404).send("Invalid credentials");
        const token = jsonwebtoken_1.default.sign({ id: user.id }, constants_1.SECRET, {
            expiresIn: 5184000
        });
        return res.status(200).send({
            ...user,
            token: token
        });
    }
    catch (error) {
        return res.status(500).send(error);
    }
};
exports.signin = signin;
//# sourceMappingURL=auth.controller.js.map