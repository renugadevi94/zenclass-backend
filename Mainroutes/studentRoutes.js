const studentRouter = require("express").Router();
const {
  signup,
  confirmStudent,
  update,
  forgotPassword,
  reset,
} = require("../Acontrollers/student");



studentRouter.post("/student/signup", signup);

studentRouter.patch("/student/confirm/:id", confirmStudent);

studentRouter.put("/student/update", update);

studentRouter.put("/student/forgot", forgotPassword);

studentRouter.patch("/student/reset/:id", reset);


module.exports = studentRouter;