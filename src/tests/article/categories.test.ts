import request from "supertest";
// import app from "../../app";
import dataSourceHandler from "../../utils/dataSourceHandler";

require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
dataSourceHandler()


interface dataTypes {
    name: string;
}

let data: dataTypes = {
    name: "10ppp"
};

describe('test categories CRUD', () => {
    test('add category', async () => {
        const res = await request(BASE_URL).post(`/article/category/add`).send({
            name: data.name
        });
        expect(res.status).toBe(201);
    });

    test('get a category', async () => {
        const res = await request(BASE_URL).get("/article/category/getCategory").send({
            name: data.name
        });
        expect(res.status).toEqual(200);
    });

    test('get all categories', async () => {
        const res = await request(BASE_URL).get("/article/category/getAllCategories").send({
            name: data.name
        });
        expect(res.status).toEqual(200);
    });

    test('delete category', async () => {
        const getID = await request(BASE_URL).get("/article/category/getCategory").send({
            name: data.name
        });
        const res = await request(BASE_URL).delete("/article/category/delete").send({
            id: getID.body.id
        });
        expect(res.status).toEqual(200);
    });
});
