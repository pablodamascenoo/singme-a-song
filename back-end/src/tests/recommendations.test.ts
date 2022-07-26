import app from "../app.js";
import supertest from "supertest";
import {
  expectedObject,
  getIdByName,
  validBody,
} from "./factories/recommendationsFactory.js";

describe("POST /recommendations", () => {
  it("422 on invalid input", async () => {
    const response = await supertest(app).post("/recommendations").send({});
    expect(response.status).toEqual(422);
  });
  it("201 on valid input", async () => {
    const body = validBody();
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.status).toEqual(201);
  });
  it("409 on conflict", async () => {
    const body = validBody();
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.status).toEqual(409);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  it("404 on not found id", async () => {
    const response = await supertest(app).post("/recommendations/2/upvote");
    expect(response.status).toEqual(404);
  });
  it("200 on upvote", async () => {
    const id = await getIdByName("mockVideo");
    const response = await supertest(app).post(`/recommendations/${id}/upvote`);
    expect(response.status).toEqual(200);
  });
});

describe("POST /recommendations/:id/downvote", () => {
  it("404 on not found id", async () => {
    const response = await supertest(app).post("/recommendations/2/downvote");
    expect(response.status).toEqual(404);
  });
  it("200 on downvote", async () => {
    const id = await getIdByName("mockVideo");
    const response = await supertest(app).post(
      `/recommendations/${id}/downvote`
    );
    expect(response.status).toEqual(200);
  });
});

describe("GET /recommendations", () => {
  it("get 200 and valid response", async () => {
    const response = await supertest(app).get("/recommendations");
    const id = await getIdByName("mockVideo");
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(
      expect.objectContaining(expectedObject(id))
    );
    expect(response.body.length).toBeLessThan(11);
  });
});

describe("GET /recommendations/:id", () => {
  it("get 200 and valid response", async () => {
    const id = await getIdByName("mockVideo");
    const response = await supertest(app).get(`/recommendations/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining(expectedObject(id)));
  });
});
