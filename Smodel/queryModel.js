const mongoose = require("mongoose");



const querySchema = new mongoose.Schema({
  queryTitle: {
    type: String,
    required: true, 
  },
  queryDesc: {
    type: String,
    required: true,
  },
  appliedOn: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Not assigned",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

module.exports = mongoose.model("Query", querySchema, "querys");