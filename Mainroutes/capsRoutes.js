const capstoneRouter = require("express").Router();
const { fetchCapstone, postCapstone } = require("../Acontrollers/caps");



capstoneRouter.get("/student/capstone", fetchCapstone);

capstoneRouter.post("/student/capstone", postCapstone);

module.exports = capstoneRouter;