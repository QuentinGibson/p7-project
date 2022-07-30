const db = require("../models");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

module.exports = {
  deleteUser: async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const { user_id } = decodedToken;
    await db.User.destroy({ where: { id: user_id } })
      .then(() => {
        res.status(200).json({ message: "User successfully deleted!" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Failed to delete User", error });
      });
  },
  updateUser: async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const { user_id } = decodedToken;
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 13);
    await db.User.update({ email, passwordHash }, { where: { user_id } })
      .then(() => {
        res.ststus(200).json({ message: "User successfully updated!" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Failed to update User", error });
      });
  },
  getUser: async (req, res, next) => {
    const user_id = req.params.id;
    await db.User.findOne({ where: { user_id } })
      .then((user) => {
        res.status(200).json({ message: "User found!", user: user.toJSON() });
      })
      .catch((error) => {
        res.status(500).json({ message: "No user found!", error });
      });
  },
  getListOfSeen: async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const { user_id } = decodedToken;
    await db.User_Post_Visit.findAll({
      where: {
        UserId: user_id,
      },
    }).then((result) => {
      const postIdList = result.map((obj) => {
        return obj.PostId;
      });
      res.status(200).json({ message: "List Found!", postIdList });
    });
  },
  getAllUserPostInformation: async (req, res, next) => {
    const user_id = req.params.id;
    await db.User.findOne({ where: { user_id }, include: [db.Post] })
      .then((user) => {
        res.status(200).json({ message: "User found!", user: user.toJSON() });
      })
      .catch((error) => {
        res.status(500).json({ message: "No user found!", error });
      });
  },
};
