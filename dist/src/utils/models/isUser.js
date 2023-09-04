"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const data_source_1 = require("./../../data-source");
const user = data_source_1.dataSource.getRepository(user_1.User);
const isUser = async (id) => {
    if (id) {
        const findUser = await user.findOne({
            where: {
                id: id
            }
        });
        return findUser;
    }
    else {
        return undefined;
    }
};
exports.default = isUser;
//# sourceMappingURL=isUser.js.map