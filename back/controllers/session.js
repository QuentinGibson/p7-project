const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();
module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.body;
    await bcrypt
      .hash(password, 13)
      .then(async (hash) => {
        return await db.User.findOrCreate({
          where: { email },
          defaults: { password: hash },
        });
      })
      .then(([user, created]) => {
        if (!created) {
          res.status(500).json({
            message: "An account with this email already exists",
          });
        } else {
          res.status(202).json({
            message: "User successfully created",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error when saving user",
          error,
        });
      });
  },
  signIn: async (req, res, next) => {
    const { email, password } = req.body;
    await db.User.findOne({ where: { email } }).then(async (user) => {
      if (!user) {
        res.status(500).json({
          message: "Login Invalid",
        });
      } else {
        const storedHash = await user.getDataValue("password");
        await bcrypt
          .compare(password, storedHash)
          .then(async (match) => {
            if (match) {
              const user_id = await user.getDataValue("id");
              const token = jwt.sign({ user_id }, process.env.TOKEN_SECRET, {
                expiresIn: "24h",
              });
              res.status(200).json({
                message: "Sign in Successful",
                user_id,
                token,
              });
            } else {
              res.status(500).json({
                message: "Login Invalid",
              });
            }
          })
          .catch((error) => {
            res.status(500).json({
              message: "Error when logging in",
              error,
            });
          });
      }
    });
  },
};
