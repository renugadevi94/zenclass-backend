const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const Student = require("../Smodel/studentModel");
const Leave = require("../Smodel/leaveModel");


const getTokenFrom = (req) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("bearer ")) {
    return authorization.replace("bearer ", "");
  }
};

// fetching all leave

const fetchLeave = async (req, res) => {
  try {
    

    const token = getTokenFrom(req);
    if (!token) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }
    // verifying the token
    const decodedToken = jwt.verify(token, SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ message: "token invalid" });
    }

    

    const leaves = await Student.findById(decodedToken.id).populate("leave");

    res.status(200).json(leaves.leave);
    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on fetching data please login & try again" });
  }
};

//posting new leave

const postLeave = async (req, res) => {
  try {
    //getting body content
    const { reason, appliedOn } = req.body;

    
    const token = getTokenFrom(req);

    //verify the token
    const decodedToken = jwt.verify(token, SECRET);

    
    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    
    const student = await Student.findById(decodedToken.id);

    
    const newLeave = new Leave({
      reason,
      appliedOn,
      student: student._id,
    });


    const savedLeave = await newLeave.save();

    
    student.leave = student.leave.concat(savedLeave._id);

    await student.save();


    res.status(200).json({ message: "leave submitted sucessfully" });

    //
  } catch (error) {
    return res.status(400).json({ message: "Please fill all data" });
  }
};

//deleting leave

const deleteLeave = async (req, res) => {
  try {
    //body content
    const id = req.params.id;

    //getting token
    const token = getTokenFrom(req);

    //verify the token
    const decodedToken = jwt.verify(token, SECRET);

    
    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    

    const matchedLeave = await Leave.findById(id);
    if (!matchedLeave) {
      return res.status(401).json({ message: "Leave data not found" });
    }

    // deleting leave from collection

    await Leave.findByIdAndDelete(id);

    //removing from student db

    await Student.findByIdAndUpdate(
      decodedToken.id,
      {
        $pull: { leave: id },
      },
      { new: true }
    );

    
    res.status(200).json({ message: "leave deleted sucessfully" });

    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on updating, please try again later" });
  }
};

module.exports = {
  fetchLeave,
  postLeave,
  deleteLeave,
};