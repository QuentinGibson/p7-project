const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const user_id = decodedToken.user_id;

    if (req.body.user_id && req.body.user_id !== user_id) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      error: "No proper auth found",
      errorObj: error,
    });
  }
};
