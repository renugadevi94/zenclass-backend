const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const Student = require("../Smodel/studentModel");
const Mock = require("../Smodel/mockModel");


const getTokenFrom = (req) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("bearer ")) {
    return authorization.replace("bearer ", "");
  }
};



const fetchMock = async (req, res) => {
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

    

    const mocks = await Student.findById(decodedToken.id).populate("mock");

    res.status(200).json(mocks.mock);
    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on fetching data please login & try again" });
  }
};



const postMock = async (req, res) => {
  try {
     //body content
    const {
      interviewDate,
      interviewerName,
      interviewRound,
      comment,
      logicalScore,
      overallScore,
    } = req.body;

    //getting token
    const token = getTokenFrom(req);

    //verify the token
    const decodedToken = jwt.verify(token, SECRET);


    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    
    const student = await Student.findById(decodedToken.id);

    
    const newMock = new Mock({
      interviewDate,
      interviewerName,
      interviewRound,
      comment,
      logicalScore,
      overallScore,
      student: student._id,
    });

    
    const savedMock = await newMock.save();

    
    student.mock = student.mock.concat(savedMock._id);

    await student.save();

    
    res.status(200).json({ message: "mock submitted sucessfully" });

    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on updating, please try again later" });
  }
};

module.exports = {
  fetchMock,
  postMock,
};