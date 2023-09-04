"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = require("../../models/article/categories");
const data_source_1 = require("./../../data-source");
const category = data_source_1.dataSource.getRepository(categories_1.Category);
const isCategory = async (id) => {
    const findCategory = await category.findOne({
        where: {
            id: id
        }
    });
    return findCategory;
};
exports.default = isCategory;
//# sourceMappingURL=isCategory.js.map