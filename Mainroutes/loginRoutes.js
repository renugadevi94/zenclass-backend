const loginRouter = require("express").Router();
const { login } = require("../Acontrollers/login");

loginRouter.post("/student/login", login);

module.exports = loginRouter;