import request from "supertest";
// import app from "../app";
import dataSourceHandler from "../utils/dataSourceHandler";

const BASE_URL = process.env.BASE_URL
dataSourceHandler()

describe('Server Connection test', () => {
    test('Connection Test', async () => {
        const res = await request(BASE_URL).get("/")
        expect(res.status).toEqual(200)
    })
});