const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const Student = require("../Smodel/studentModel");
const Portfolio = require("../Smodel/portModel");


const getTokenFrom = (req) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("bearer ")) {
    return authorization.replace("bearer ", "");
  }
};



const fetchPortfolio = async (req, res) => {
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

    

    const portfolios = await Student.findById(decodedToken.id).populate(
      "portfolio"
    );

    res.status(200).json(portfolios.portfolio);
    //
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on fetching data please login & try again" });
  }
};



const postPortfolio = async (req, res) => {
  try {
    //body content
    const { portfolioURL, githubURL, resumeURL } = req.body;

    
    const token = getTokenFrom(req);

    
    const decodedToken = jwt.verify(token, SECRET);

    
    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    
    const portfolios = await Student.findById(decodedToken.id).populate(
      "portfolio"
    );

    if (portfolios.portfolio.length) {
      return res.status(401).json({ message: "Already Submitted" });
    }

    
    const student = await Student.findById(decodedToken.id);

    
    const newPortfolio = new Portfolio({
      portfolioURL,
      githubURL,
      resumeURL,
      student: student._id,
    });

    
    const savedPortfolio = await newPortfolio.save();

    
    student.portfolio = student.portfolio.concat(savedPortfolio._id);

    await student.save();

    
    res.status(200).json({ message: "portfolio submitted sucessfully" });

    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on updating, please try again later" });
  }
};

module.exports = {
  fetchPortfolio,
  postPortfolio,
};