const webcodeRouter = require("express").Router();
const { fetchWebcode, postWebcode } = require("../Acontrollers/web");


webcodeRouter.get("/student/webcode", fetchWebcode);

webcodeRouter.post("/student/webcode", postWebcode);

module.exports = webcodeRouter;