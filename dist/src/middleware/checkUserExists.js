"use strict";
/*
* Middleware to check if a user exists
* */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserExists = void 0;
const data_source_1 = require("../data-source");
const user_1 = require("../models/user");
const checkUserExists = async (req, res, next) => {
    const user = await data_source_1.dataSource.getRepository(user_1.User)
        .findOne({ where: { email: req.body.email } });
    if (user)
        return res.status(409).send('User already exists');
    next();
};
exports.checkUserExists = checkUserExists;
//# sourceMappingURL=checkUserExists.js.map