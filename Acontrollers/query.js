const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const Student = require("../Smodel/studentModel");
const Query = require("../Smodel/queryModel");


const getTokenFrom = (req) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("bearer ")) {
    return authorization.replace("bearer ", "");
  }
};



const fetchQuery = async (req, res) => {
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

    

    const querys = await Student.findById(decodedToken.id).populate("query");

    res.status(200).json(querys.query);
    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on fetching data please login & try again" });
  }
};



const postQuery = async (req, res) => {
  try {
    //body content
    const { queryTitle, queryDesc } = req.body;

    
    const token = getTokenFrom(req);

    
    const decodedToken = jwt.verify(token, SECRET);

    
    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    
    const student = await Student.findById(decodedToken.id);

    
    const newQuery = new Query({
      queryTitle,
      queryDesc,
      student: student._id,
    });

    
    const savedQuery = await newQuery.save();


    student.query = student.query.concat(savedQuery._id);

    await student.save();

    
    res.status(200).json({ message: "query applied sucessfully" });

    
  } catch (error) {
    return res.status(400).json({ message: "Please fill all data" });
  }
};



const deleteQuery = async (req, res) => {
  try {
    
    const id = req.params.id;


    const token = getTokenFrom(req);

    
    const decodedToken = jwt.verify(token, SECRET);


    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    

    const matchedQuery = await Query.findById(id);
    if (!matchedQuery) {
      return res.status(401).json({ message: "query data not found" });
    }

    

    await Query.findByIdAndDelete(id);

    

    await Student.findByIdAndUpdate(
      decodedToken.id,
      {
        $pull: { query: id },
      },
      { new: true }
    );

    
    res.status(200).json({ message: "query deleted sucessfully" });

    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on updating, please try again later" });
  }
};

module.exports = {
  fetchQuery,
  postQuery,
  deleteQuery,
};