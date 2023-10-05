const jwt = require("jsonwebtoken");
const Student = require("../Smodel/studentModel");
const bcrypt = require("bcrypt");
const { SECRET } = require("../utils/config");

const login = async (req, res) => {
  try {
   
    const { email, password } = req.body;

   
    const student = await Student.findOne({ email });

    
    if (!student) {
      return res
        .status(401)
        .json({ message: "invalid username/Please Sign-up" });
    }

    
    if (!student.verified) {
      return res
        .status(401)
        .json({ message: "Account not verfied, please check your Email" });
    }

    const passwordCheck = await bcrypt.compare(password, student.password);

    
    if (!passwordCheck) {
      return res.status(401).json({ message: "password incorrect" });
    }

    
    const studentToken = {
      name: student.fname,
      id: student._id,
    };

    const token = jwt.sign(studentToken, SECRET, { expiresIn: "1hr" });

    
    res.status(200).send({ token, student });

    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on sign up please try again" });
  }
};

module.exports = {
  login,
};