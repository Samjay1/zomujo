"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const dataSourceHandler_1 = __importDefault(require("../utils/dataSourceHandler"));
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
(0, dataSourceHandler_1.default)();
describe('Authentication Routes Tests', () => {
    const testUser = {
        email: "foo6@example.com",
        name: "bar",
        password: "some password"
    };
    test('Sign Up Test', async () => {
        const response = await (0, supertest_1.default)(BASE_URL).post('/auth/register').send({
            ...testUser
        });
        expect(response.status).toEqual(201);
    });
    test('Log In Test', async () => {
        const response = await (0, supertest_1.default)(BASE_URL).post('/auth/login').send({
            email: testUser.email,
            password: testUser.password
        });
        expect(response.status).toEqual(200);
    });
});
//# sourceMappingURL=auth.js.map