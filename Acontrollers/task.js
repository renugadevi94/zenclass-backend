const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const Student = require("../Smodel/studentModel");
const Task = require("../Smodel/taskModel");


const getTokenFrom = (req) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("bearer ")) {
    return authorization.replace("bearer ", "");
  }
};


const fetchTask = async (req, res) => {
  try {
    
    const token = getTokenFrom(req);
    if (!token) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }
    
    const decodedToken = jwt.verify(token, SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ message: "token invalid" });
    }

    
    const tasks = await Student.findById(decodedToken.id).populate("task");

    res.status(200).json(tasks.task);
    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on fetching data please login & try again" });
  }
};


const fetchAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({});

    res.status(200).json(tasks);
    //
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on fetching data please login & try again" });
  }
};



const postTask = async (req, res) => {
  try {
    //body content
    const {
      day,
      frontEndCode,
      frontEndURL,
      backEndCode,
      backEndURL,
      task,
      title,
      check,
    } = req.body;

    
    const token = getTokenFrom(req);

    
    const decodedToken = jwt.verify(token, SECRET);

    
    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    
    const student = await Student.findById(decodedToken.id);

    
    const matchedtask = await Task.findOne({ check });
    if (matchedtask) {
      res.status(400).json({ message: "Task already submitted" });
      return;
    }

    
    const newTask = new Task({
      day,
      frontEndCode,
      frontEndURL,
      backEndCode,
      backEndURL,
      task,
      title,
      check,
      student: student._id,
    });

    
    const savedTask = await newTask.save();

    
    student.task = student.task.concat(savedTask._id);

    await student.save();

    
    res.status(200).json({ message: "task submitted sucessfully" });

    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on updating, please try again later" });
  }
};



const updateTaskScore = async (req, res) => {
  try {
    // body content
    const { id, score } = req.body;

    
    const matchedtask = await Task.findOne({ _id: id });

    if (!matchedtask) {
      res.status(400).json({ message: "Task not found or already evalauted" });
      return;
    }

    
    matchedtask.score = score;

    await Task.findByIdAndUpdate(matchedtask.id, matchedtask);

    
    res.status(200).json({ message: "task score updated Succesfully" });

    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on updating, please try again later" });
  }
};

module.exports = {
  fetchTask,
  postTask,
  updateTaskScore,
  fetchAllTask,
};