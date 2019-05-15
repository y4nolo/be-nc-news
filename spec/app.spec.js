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
          // console.log(body);
          expect(body.articles).to.be.sortedBy("author");
        });
    });
  });

  //get articles by ID
  describe("/api/articles/:article_id", () => {
    it("GET status:200, responds with a specific article", () => {
      return request
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.eql({
            article_id: 1,
            author: "jessjelly",
            title: "Running a Node App",
            topic: "coding",
            body:
              "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
            created_at: "2016-08-18T12:07:52.000Z",
            votes: 0,
            comment_count: "8"
          });
        });
    });
  });

  //patch articles by id - increment votes
  describe("/api/articles/:article_id", () => {
    it("GET status: 200, responds modified article vote", () => {
      return request
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.contain({
            votes: 1
          });
        });
    });
  });
  //get comments by article id - returns all comments under a requested article

  describe("/api/articles/:article_id", () => {
    it("GET status: 200, responds with all comments for a given article ID", () => {
      return request
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0]).to.contain.keys(
            "comment_id",
            "votes",
            "created_at",
            "author",
            "body"
          );
          // expect(body.comments).to.be.sortedBy("created_at");
        });
    });
  });
});
