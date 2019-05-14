process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);

describe.only("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });

  //get all topics
  describe("/api/topics", () => {
    it("GET status:200, reponds with an array of topic objects", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics[0]).to.contain.keys("slug", "description");
        });
    });
  });
});
