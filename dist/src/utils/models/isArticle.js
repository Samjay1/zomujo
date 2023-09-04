"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_1 = require("../../models/article/content");
const data_source_1 = require("./../../data-source");
const content = data_source_1.dataSource.getRepository(content_1.Content);
const isArticle = async (id) => {
    const findArticle = await content.findOne({
        where: {
            id: id
        }
    });
    return findArticle;
};
exports.default = isArticle;
//# sourceMappingURL=isArticle.js.map