"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
// import app from "../app";
const dataSourceHandler_1 = __importDefault(require("../utils/dataSourceHandler"));
const BASE_URL = process.env.BASE_URL;
(0, dataSourceHandler_1.default)();
describe('Server Connection test', () => {
    test('Connection Test', async () => {
        const res = await (0, supertest_1.default)(BASE_URL).get("/");
        expect(res.status).toEqual(200);
    });
});
//# sourceMappingURL=main.js.map