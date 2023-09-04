import request from "supertest";
// import app from '../app'
import dataSourceHandler from "../utils/dataSourceHandler";

require("dotenv").config();
dataSourceHandler()

const BASE_URL = process.env.BASE_URL;

describe("Appointment Routes test", () => {
  test("book appointment", async () => {
    const response = await request(BASE_URL).post("/appointement/book").send({
      scheduledTime: "2023-07-15T10:00:00Z",
      durationMinutes: 60,
      status: "pending",
      additionalInformation: "Please bring any relevant documents and fones",
      therapistId: "f4871297-2c18-4fec-a4d1-c3654fe7ba35",
      userId: "e8649e0f-0051-4c8c-b603-7e9834544ccb",
    });
    expect(response.status).toEqual(200);
  });

  test("manage appointment", async () => {
    const response = await request(BASE_URL).patch("/appointment/manage").send({
      accept: false,
      id: "11a21472-b0e1-4f19-8e0d-17bdd110cca1",
      therapistId: "f4871297-2c18-4fec-a4d1-c3654fe7ba35",
    });

    expect(response.status).toEqual(200);
  });

  test("get all therapist appointments", async () => {
    const response = await request(BASE_URL).get(
      "/appointment/therapist/all?id=f4871297-2c18-4fec-a4d1-c3654fe7ba35"
    );

    expect(response.status).toEqual(200);
  });

  test("get all user appointments", async () => {
    const response = await request(BASE_URL).get(
      "/appointment/user/all?id=e8649e0f-0051-4c8c-b603-7e9834544ccb"
    );

    expect(response.status).toEqual(200);
  });

  test("get single appointment", async () => {
    const response = await request(BASE_URL).get(
      "/appointment/single?id=c8d02c65-f4d1-477d-8a27-2ee1916e8321"
    );

    expect(response.status).toEqual(200);
  });
});
