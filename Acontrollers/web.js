const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const Student = require("../Smodel/studentModel");
const Webcode = require("../Smodel/webModel");


const getTokenFrom = (req) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("bearer ")) {
    return authorization.replace("bearer ", "");
  }
};


const fetchWebcode = async (req, res) => {
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

    
    const webcodes = await Student.findById(decodedToken.id).populate(
      "webcode"
    );

    res.status(200).json(webcodes.webcode);
    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on fetching data please login & try again" });
  }
};



const postWebcode = async (req, res) => {
  try {
    // body content
    const { feUrl, feCode } = req.body;

    
    const token = getTokenFrom(req);

    
    const decodedToken = jwt.verify(token, SECRET);

   
    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    
    const webcodes = await Student.findById(decodedToken.id).populate(
      "webcode"
    );

    if (webcodes.webcode.length) {
      return res.status(401).json({ message: "Already Submitted" });
    }

    
    const student = await Student.findById(decodedToken.id);

    
    const newWebcode = new Webcode({
      feUrl,
      feCode,
      student: student._id,
    });

    
    const savedWebcode = await newWebcode.save();

    
    student.webcode = student.webcode.concat(savedWebcode._id);

    await student.save();

    
    res.status(200).json({ message: "webcode submitted sucessfully" });

    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on updating, please try again later" });
  }
};

module.exports = {
  fetchWebcode,
  postWebcode,
};