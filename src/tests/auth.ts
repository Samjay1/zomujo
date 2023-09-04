import request from "supertest";
import dataSourceHandler from "../utils/dataSourceHandler";

require('dotenv').config()

const BASE_URL = process.env.BASE_URL
dataSourceHandler()

describe('Authentication Routes Tests', () => {
    const testUser = {
        email: "foo6@example.com",
        name: "bar",
        password: "some password"
    }

    test('Sign Up Test', async () => {
        const response = await request(BASE_URL).post('/auth/register').send({
            ...testUser
        })
        expect(response.status).toEqual(201)
    })

    test('Log In Test', async () => {
        const response = await request(BASE_URL).post('/auth/login').send({
            email: testUser.email,
            password: testUser.password
        })
        expect(response.status).toEqual(200)
    })
});
