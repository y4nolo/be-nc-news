const { formatArticleDates } = require("../utils/create-article-date-ref");

const { formatComments } = require("../utils/create-comment-reformat-ref");

const { expect } = require("chai");

describe("formatArticleDates", () => {
  it("return a formmated date string from a unix timestamp", () => {
    const testComments = [
      {
        title: "Moustache",
        topic: "mitch",
        author: "butter_bridge",
        body: "Have you seen the size of that thing?",
        created_at: 154700514171
      }
    ];
    const expectedOutcome = {
      title: "Moustache",
      topic: "mitch",
      author: "butter_bridge",
      body: "Have you seen the size of that thing?",
      created_at: "Nov-26-1974 12:21:54"
    };

    expect(formatArticleDates(testComments)[0]).to.eql(expectedOutcome);
  });
});

describe("formatComments", () => {
  it("return a formmated date string from a unix timestamp, replaces belongs_to with articles_id, replaces created_by with author ", () => {
    const testComments = [
      {
        body: "This morning, I showered for nine minutes.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 975242163389
      }
    ];
    const article_ref = { "Living in the shadow of a great man": 1 };

    const expectedOutcome = [
      {
        body: "This morning, I showered for nine minutes.",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: "Nov-26-2000 12:36:03"
      }
    ];

    expect(formatComments(testComments, article_ref)).to.eql(expectedOutcome);
  });
});
