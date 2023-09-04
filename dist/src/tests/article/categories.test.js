"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
// import app from "../../app";
const dataSourceHandler_1 = __importDefault(require("../../utils/dataSourceHandler"));
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
(0, dataSourceHandler_1.default)();
let data = {
    name: "10ppp"
};
describe('test categories CRUD', () => {
    test('add category', async () => {
        const res = await (0, supertest_1.default)(BASE_URL).post(`/article/category/add`).send({
            name: data.name
        });
        expect(res.status).toBe(201);
    });
    test('get a category', async () => {
        const res = await (0, supertest_1.default)(BASE_URL).get("/article/category/getCategory").send({
            name: data.name
        });
        expect(res.status).toEqual(200);
    });
    test('get all categories', async () => {
        const res = await (0, supertest_1.default)(BASE_URL).get("/article/category/getAllCategories").send({
            name: data.name
        });
        expect(res.status).toEqual(200);
    });
    test('delete category', async () => {
        const getID = await (0, supertest_1.default)(BASE_URL).get("/article/category/getCategory").send({
            name: data.name
        });
        const res = await (0, supertest_1.default)(BASE_URL).delete("/article/category/delete").send({
            id: getID.body.id
        });
        expect(res.status).toEqual(200);
    });
});
//# sourceMappingURL=categories.test.js.map