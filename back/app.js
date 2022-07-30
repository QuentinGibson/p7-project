const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const errorhandler = require("errorhandler");
const db = require("./models");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

require("dotenv").config();

db.sequelize.sync();
if (process.env.NODE_ENV === "test") {
  db.sequelize.sync({ force: true });
}
const app = express();
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(bodyParser.json());
app.use("/images", express.static("images"));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/post", postRoutes);
if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}
module.exports = app;
