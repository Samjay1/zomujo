import request from "supertest";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL;

describe("Wellbeing Test routes test", () => {
  test("get test questions (SLS)", async () => {
    const response = await request(BASE_URL).get("/wellbeing/questions/SLS");
    expect(response.status).toEqual(200);
  });
  test("get test when param doesnt match enum", async () => {
    const response = await request(BASE_URL).get("/wellbeing/questions/test");
    expect(response.status).toEqual(400);
  });
  test("get results", async () => {
    const response = await request(BASE_URL)
      .post("/wellbeing/results")
      .send({
        type: "GAD",
        response: [
          {
            question:
              "I have been able to laugh and see the funny side of things.",
            answer: 2,
          },
          {
            question: "I have looked forward with enjoyment to things.",
            answer: 1,
          },
          {
            question:
              "I have blamed myself unnecessarily when things went wrong.",
            answer: 0,
          },
          {
            question: "I have been anxious or worried for no good reason.",
            answer: 3,
          },
          {
            question: "I have felt scared or panicky for no good reason.",
            answer: 1,
          },
          {
            question: "Things have been getting on top of me.",
            answer: 2,
          },
          {
            question:
              "I have been so unhappy that I have had difficulty sleeping.",
            answer: 0,
          },
          {
            question: "I have felt sad or miserable.",
            answer: 3,
          },
          {
            question: "I have been so unhappy that I have been crying.",
            answer: 2,
          },
          {
            question: "The thought of harming myself has occurred to me.",
            answer: 1,
          },
        ],
        id: "e8649e0f-0051-4c8c-b603-7e9834544ccb",
      });
    expect(response.status).toEqual(201);
  });

  test("get user test history", async () => {
    const response = await request(BASE_URL).get(
      "/wellbeing/history?id=e8649e0f-0051-4c8c-b603-7e9834544ccb"
    );
    expect(response.status).toEqual(200);
  });
});
