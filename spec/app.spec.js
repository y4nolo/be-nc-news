process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

describe("/", () => {
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

  // topics
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
  // articles
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
    it("GET status:200, responds with the articles ordered by a specific query e.g. author, created at", () => {
      return request
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy("author");
          expect(body.articles[0].author).to.eql("butter_bridge");
        });
    });
    it("GET status:200, responds with articles by a specific author", () => {
      return request
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[1].author).to.eql("butter_bridge");
        });
    });
    //error - invalid author
    it("GET status:404, responds an error message when invalid author is requested", () => {
      return request
        .get("/api/articles?author=not-an-author")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Articles Not Found");
        });
    });
    it("GET status:200, responds with articles by a specific topic", () => {
      return request
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].topic).to.eql("mitch");
        });
    });
    it("GET status:200, responds with the articles ordered by a specific query - topic", () => {
      return request
        .get("/api/articles?sort_by=topic")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy("topic");
        });
    });
    //error - invalid topic
    it("GET status:404, returns an error code when passed an invalid topic", () => {
      return request
        .get("/api/articles?topic=not-a-topic")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.be.eql("Articles Not Found");
        });
    });
    it("GET status:200, esponds with the articles ordered by a specific query - created_at", () => {
      return request
        .get("/api/articles?sort_by=created_at")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy("created_at");
        });
    });
    //error -  bad sort request
    it("GET status:400, responds with a error message when ordered by a specific invalid query", () => {
      return request
        .get("/api/articles?sort_by=not-a-column")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("query input does not exist");
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
              author: "butter_bridge",
              title: "Living in the shadow of a great man",
              topic: "mitch",
              votes: 100,
              created_at: "2018-11-15T12:21:54.000Z",
              body: "I find this existence challenging",
              comment_count: "13"
            });
          });
      });
    });

    //patch articles by id - increment votes
    describe("/api/articles/:article_id", () => {
      it("PATCH status: 200, responds modified article vote", () => {
        const newVote = 1;
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: newVote })
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an("object");
            expect(body).to.contain.keys("article");
            expect(body.article).to.contain.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes"
            );
            expect(body.article.votes).to.eql(101);
          });
      });
    });
    //get comments by article id - returns all comments under a requested article

    describe("/api/articles/:article_id/comments", () => {
      it("GET status: 200, responds with all comments for a given article ID", () => {
        return request
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.an("array");
            body.comments.forEach(comment => {
              expect(comment).to.contain.keys(
                "comment_id",
                "votes",
                "created_at",
                "author",
                "body"
              );
            });
          });
      });

      it("GET status: 200, responds with all comments for a given article ID, can be orderd by any valid column", () => {
        return request
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.descendingBy("created_at");
          });
      });

      it("GET status: 200, responds with sorted articles by any valid column passed in query", () => {
        return request
          .get("/api/articles/1/comments?sort_by=author")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.descendingBy("author");
          });
      });

      it("POSTS status: 201, posts a comment to a given article ID", () => {
        const newComment = {
          username: "butter_bridge",
          body: "this is a great test comment"
        };
        const articleID = 5;
        return request
          .post(`/api/articles/${articleID}/comments`)
          .send(newComment)
          .expect(201)
          .then(({ body }) => {
            expect(body).to.be.an("object");
            expect(body.comment).to.contain.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(body.comment.author).to.eql("butter_bridge");
            expect(body.comment.body).to.eql("this is a great test comment");
            expect(body.comment.article_id).to.eql(articleID);
          });
      });
      //error
      //error get
      it("GET status: 400, fails to respond with all comments for a invalid article ID i.e.invalid_id ", () => {
        return request
          .get("/api/articles/invalid_id/comments")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.eql("id must be type integer");
          });
      });
      //error post
      it("GET status: 400, fails to respond with all comments for a invalid article ID i.e. banana ", () => {
        return request
          .get(`/api/articles/banana/comments`)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.eql("id must be type integer");
          });
      });

      it("POSTS status: 400, fails to post a comment to a invalid article ID", () => {
        return request
          .post("/api/articles/9999/comments")
          .send({
            username: "butter_bridge",
            body: "This is a terrible test comment"
          })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.eql("article not found");
          });
      });
    });
  });
  // comments
  describe("/api/comments/:comment_id", () => {
    //patch comments by comment id - increases or decreases votes on a comment
    it("PATCH status: 200, responds with modified comment vote", () => {
      const newVote = 1;
      return request
        .patch("/api/articles/1")
        .send({ inc_votes: newVote })
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
          expect(body).to.contain.keys("article");
          expect(body.article).to.contain.keys(
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes"
          );
          expect(body.article.votes).to.eql(101);
        });
    });
  });
  //patch error
  it("PATCH status: 404, responds with error code for invalid comment ID", () => {
    return request
      .patch("/api/comments/1000")
      .send({ inc_votes: 10 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.eql("Comment Not Found");
      });
  });
  it("DELETE /comments - status: 204, deletes the specified comment ", () => {
    return request
      .delete("/api/comments/1")
      .expect(204)
      .then(({ body }) => {
        expect(body.comment).to.equal(undefined);
      });
  });
  it("DELETE /comments - status: 400, returns error status for invalid id deletion request", () => {
    return request
      .delete("/api/comments/not-a-number")
      .expect(400)
      .then(({ body }) => {
        expect(body.comment).to.equal(undefined);
      });
  });
  it("DELETE /comments - status: 404, returns error status for invalid id deletion request", () => {
    return request
      .delete("/api/comments/1000")
      .expect(404)
      .then(({ body }) => {
        expect(body.comment).to.equal(undefined);
      });
  });
  // users
  describe("/api/users/:username", () => {
    it("GET status:200, responds with an specified user object", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).to.be.an("array");
          body.users.forEach(user => {
            expect(user).to.contain.keys("username", "avatar_url", "name");
          });
        });
    });
    it("GET status:200, responds with a user object which should have username, avatar_url & name properties", () => {
      return request
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(({ body }) => {
          expect(body.user).to.be.an("object");
          expect(body.user).to.contain.keys("username", "avatar_url", "name");
        });
    });

    //error
    it("GET status:405, responds with an error when an invalid user is requested", () => {
      return request
        .put("/api/users")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.eql("Method Not Allowed");
        });
    });
  });
});
