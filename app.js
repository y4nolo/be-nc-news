const express = require("express");
const apiRouter = require("./routes/api");
const cors = require("cors");

const {
  handleSQLErrors,
  routeNotFound,
  handle500,
  badrequest
} = require("./errors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handleSQLErrors);
app.use(badrequest);
app.use(routeNotFound);
app.use(handle500);
module.exports = app;
