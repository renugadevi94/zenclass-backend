const queryRouter = require("express").Router();
const {
  fetchQuery,
  postQuery,
  deleteQuery,
} = require("../Acontrollers/query");



queryRouter.get("/student/query", fetchQuery);

queryRouter.post("/student/query", postQuery);

queryRouter.delete("/student/query/:id", deleteQuery);

module.exports = queryRouter;