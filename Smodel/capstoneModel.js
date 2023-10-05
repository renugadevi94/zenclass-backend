const mongoose = require("mongoose");



const capstoneSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Zendesk clone",
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
  beUrl: {
    type: String,
    required: true,
  },
  feCode: {
    type: String,
    required: true,
  },
  beCode: {
    type: String,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});


module.exports = mongoose.model("Capstone", capstoneSchema, "capstones");