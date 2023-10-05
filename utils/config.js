require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const APP_PASSWORD = process.env.APP_PASSWORD;
const SECRET = process.env.SECRET;
const FEURL = process.env.FEURL;


module.exports = {
  MONGO_URI,
  PORT,
  EMAIL_ADDRESS,
  APP_PASSWORD,
  SECRET,
  FEURL
  
};