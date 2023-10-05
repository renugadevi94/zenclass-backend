const Student = require("../Smodel/studentModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { EMAIL_ADDRESS, APP_PASSWORD, FEURL } = require("../utils/config");

                //signup

const signup = async (req, res) => {
 
  try {
    const {
      email,
      fname,
      lName,
      password,
    } = req.body;
    
    if (!fname || !email || !password) {
      res.status(400).json({ message: "all fields are mandotary" });
      return;
    }

    const matchedStudent = await Student.findOne({ email });
    if (matchedStudent) {
      res.status(400).json({ message: "Student already exists" });
      return;
    }

    //generating random string

    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const link = `${FEURL}/confirm/${randomString}`;

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const student = await Student.create({
      email,
      fname,
      lName,
      password: hashedPassword,
      resetToken: randomString,
    });

    

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ADDRESS,
        pass: APP_PASSWORD,
      },
    });

    const sendMail = async () => {
      const info = await transporter.sendMail({
        from: `"Renugadevi" <${EMAIL_ADDRESS}>`,
        to: student.email,
        subject: "Confirm account",
        text: link,
      });
    };

    sendMail();

    res
      .status(201)
      .json({ message: `account created successfully ${student.fname}` });
    //
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on sign up please try again" });
  }
};



           //student verification account


  const confirmStudent = async (req, res) => {
  try {
    const resetToken = req.params.id;
    const matchedStudent = await Student.findOne({ resetToken });

    
    if (matchedStudent === null || matchedStudent.resetToken === "") {
      return res
        .status(400)
        .json({ message: "student not exists or link expired" });
    }

    //confirming and updating account
    matchedStudent.verified = true;

    matchedStudent.resetToken = "";

    await Student.findByIdAndUpdate(matchedStudent.id, matchedStudent);

    res.status(201).json({
      message: `${matchedStudent.fname} account has been verified successfully`,
    });
    //
  } catch (error) {
    return res
      .status(400)
      .json({ message: "student not exists or link expired" });
  }
};

          //update student 

const update = async (req, res) => {
  try {
    const {
      email,
      fname,
      lName,
      password,
    } = req.body;

    const matchedStudent = await Student.findOne({ email });

    
    if (!matchedStudent) {
      res.status(400).json({
        message: "please enter valid email / Entered mail not registered",
      });
      return;
    }
    
    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    
    matchedStudent.fname = fname;
    matchedStudent.lName = lName;
    matchedStudent.password = hashedPassword;

    await Student.findByIdAndUpdate(matchedStudent.id, matchedStudent);

    
    res
      .status(201)
      .json({ message: `account updated successfully`, matchedStudent });

    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on updating please try again later" });
  }
};

           //forgot password

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const matchedStudent = await Student.findOne({ email });

    
    if (!matchedStudent) {
      res.status(400).json({
        message: "please enter valid email / Entered mail not registered",
      });
      return;
    }

    //generating randow string
    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const link = `${FEURL}/reset/${randomString}`;

    // adding reset token to zenclass db
    matchedStudent.resetToken = randomString;

    await Student.findByIdAndUpdate(matchedStudent.id, matchedStudent);

    

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ADDRESS,
        pass: APP_PASSWORD,
      },
    });

    const sendMail = async () => {
      const info = await transporter.sendMail({
        from: `"Renugadevi" <${EMAIL_ADDRESS}>`,
        to: matchedStudent.email,
        subject: "Reset Password",
        text: link,
      });
    };

    sendMail()
      .then(() => {
        return res
          .status(201)
          .json({ message: `Mail has been send to ${matchedStudent.email}` });
      })
      .catch((err) => res.status(500).json(err));

    //
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on updating please try again later" });
  }
};

            //reset password

const reset = async (req, res) => {
  try {
    const { password } = req.body;
    const resetToken = req.params.id;

    
    const matchedStudent = await Student.findOne({ resetToken });

    
    if (matchedStudent === "null" || matchedStudent.resetToken === "") {
      return res
        .status(400)
        .json({ message: "student not exists or reset link expired" });
    }

    // hasing the new password and update
    const hashedPassword = await bcrypt.hash(password, 10);

    matchedStudent.password = hashedPassword;
    matchedStudent.resetToken = "";

    await Student.findByIdAndUpdate(matchedStudent.id, matchedStudent);

    

    res.status(201).json({
      message: `${matchedStudent.fname} password has been updated successfully`,
    });

    //
  } catch (error) {
    return res
      .status(400)
      .json({ message: "student not exists or reset link expired" });
  }
};

module.exports = {
  signup,
 confirmStudent,
  update,
  forgotPassword,
  reset,
};