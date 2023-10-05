const taskRouter = require("express").Router();
const {
  fetchTask,
  postTask,
  fetchAllTask,
  updateTaskScore,
} = require("../Acontrollers/task");



taskRouter.get("/student/task", fetchTask);

taskRouter.post("/student/task", postTask);

taskRouter.get("/student/alltask", fetchAllTask);

taskRouter.patch("/student/task/evaluation", updateTaskScore);

module.exports = taskRouter;