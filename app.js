require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./utils/config");


const studentRouter = require("./Mainroutes/studentRoutes");
const loginRouter = require("./Mainroutes/loginRoutes.js");
const capstoneRouter=require("./Mainroutes/capsRoutes");
const leaveRouter=require("./Mainroutes/leaveRoutes");
const mockRouter=require("./Mainroutes/mockRoutes");
const portfolioRouter=require("./Mainroutes/portRoutes");
const queryRouter = require("./Mainroutes/queryRoutes");
const taskRouter = require("./Mainroutes/taskRoutes");
const webcodeRouter = require("./Mainroutes/webRoutes");

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);

//mongodb connection

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to Mongo DB");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to Zen-class");
});


app.use(studentRouter);
app.use(loginRouter);
app.use(capstoneRouter);
app.use(leaveRouter);
app.use(mockRouter);
app.use(portfolioRouter);
app.use(queryRouter);
app.use(taskRouter);
app.use(webcodeRouter);

module.exports=app;