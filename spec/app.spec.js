process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

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
  //get all articles
  describe("/api/articles", () => {
    it("GET status:200, reponds with an array of articles with comment count", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          body.articles.forEach(article => {
            expect(article).to.contain.keys(
              "author",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
        });
    });
    it("responds with the articles ordered by a specific query e.g. author, created at", () => {
      return request
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.articles).to.be.sortedBy("author");
        });
    });
  });
});
