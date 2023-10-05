const mockRouter = require("express").Router();
const { fetchMock, postMock } = require("../Acontrollers/mock");



mockRouter.get("/student/mock", fetchMock);
mockRouter.post("/student/mock", postMock);

module.exports = mockRouter;