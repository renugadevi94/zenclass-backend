const mongoose = require("mongoose");



const webcodeSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Make up API",
  },
  submittedOn: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: String,
    default: "Waiting for review",
  },
  score: {
    type: String,
    default: "Waiting for review",
  },
  status: {
    type: String,
    default: "submitted",
  },
  feUrl: {
    type: String,
    required: true,
  },
  feCode: {
    type: String,
    required: true, 
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});


module.exports = mongoose.model("Webcode", webcodeSchema, "webcodes");