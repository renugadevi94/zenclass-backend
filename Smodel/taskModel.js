const mongoose = require("mongoose");



const taskSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  frontEndCode: {
    type: String,
  },
  frontEndURL: {
    type: String,
  },
  backEndCode: {
    type: String,
  },
  backEndURL: {
    type: String,
  },
  score: {
    type: String,
    default: "Yet to be graded",
  },
  task: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  submittedOn: {
    type: Date,
    default: Date.now,
  },
  check: {
    type: String,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});


module.exports = mongoose.model("Task", taskSchema, "tasks");