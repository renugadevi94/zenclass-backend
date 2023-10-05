const mongoose = require("mongoose");

//student schema

const studentSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    default: "B47-WD2 Tamil",
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  codeKata: {
    type: String,
    default: "0",
  },
  webKata: {
    type: String,
    default: "0",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  
  isMentor: {
    type: Boolean,
    default: false,
  },
  leave: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
    },
  ],
  portfolio: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
    },
  ],
  capstone: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Capstone",
    },
  ],
  webcode: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Webcode",
    },
  ],
  query: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Query",
    },
  ],
  mock: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mock",
    },
  ],
  task: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});


module.exports = mongoose.model("Student", studentSchema, "students");