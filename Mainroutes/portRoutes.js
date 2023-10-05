const portfolioRouter = require("express").Router();
const {
  fetchPortfolio,
  postPortfolio,
} = require("../Acontrollers/port");



portfolioRouter.get("/student/portfolio", fetchPortfolio);

portfolioRouter.post("/student/portfolio", postPortfolio);

module.exports = portfolioRouter;