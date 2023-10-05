const mongoose = require("mongoose");



const portfolioSchema = new mongoose.Schema({
  portfolioURL: {
    type: String,
    required: true,
  },
  githubURL: {
    type: String,
    required: true, 
  },
  resumeURL: {
    type: String,
    required: true, 
  },
  reveiwedBy: {
    type: String,
    default: "Not yet reviewed",
  },
  status: {
    type: String,
    default: "Submitted",
  },
  comment: {
    type: String,
    default: "Not yet reviewed",
  },
  submittedOn: {
    type: Date,
    default: Date.now,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});


module.exports = mongoose.model("Portfolio", portfolioSchema, "portfolios");