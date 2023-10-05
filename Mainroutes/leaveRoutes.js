const leaveRouter = require("express").Router();
const {
  fetchLeave,
  postLeave,
  deleteLeave,
} = require("../Acontrollers/leave");



leaveRouter.get("/student/leave", fetchLeave);

leaveRouter.post("/student/leave", postLeave);

leaveRouter.delete("/student/leave/:id", deleteLeave);

module.exports = leaveRouter;