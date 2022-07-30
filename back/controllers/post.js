const { QueryTypes } = require("sequelize");
const db = require("../models");
const jwt = require("jsonwebtoken");
module.exports = {
  getRecentPosts: async (req, res, next) => {
    await db.Post.findAll({
      limit: 20,
      order: [["updatedAt", "DESC"]],
      include: [{ model: db.User, attributes: ["email"] }],
    })
      .then((posts) => {
        res.status(200).json({
          message: "Successfully retrieved posts",
          posts,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Failed to retrieve posts",
          error,
        });
      });
  },
  getRecentUnseenPosts: async (req, res, next) => {
    const user_id = req.body.user_id;
    db.sequelize
      .query(
        `SELECT Posts.* FROM Posts LEFT JOIN User_Post_Visits AS upv
    ON (upv.postid = Posts.id AND upv.userId = ${user_id}) WHERE upv.postId IS NULL;`,
        { type: QueryTypes.SELECT }
      )
      .then((posts) => {
        res.status(200).json({
          message: "Succuessfully recieved posts",
          posts,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Failed to recieve posts",
          error: error.message,
        });
      });
  },
  getPostById: async (req, res, next) => {
    const post = await db.Post.findByPk(req.params.id);
    if (post) {
      res.status(200).json({
        message: "Successfully retrieved post!",
        post: post.toJSON(),
      });
    } else {
      res.status(500).json({
        message: "No post found!",
      });
    }
  },
  createPost: async (req, res, next) => {
    if (req.file) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const { user_id } = decodedToken;
      const url = req.protocol + "://" + req.get("host");
      if (typeof req.body.post === "string") {
        req.body.post = JSON.parse(req.body.post);
      }
      const { title } = req.body.post;
      const imageUrl = url + "/images/" + req.file.filename;
      const user = await db.User.findByPk(user_id);
      const post = await db.Post.create({
        title,
        creatorId: user_id,
        image: imageUrl,
      }).catch((error) => {
        res.status(500).json({
          message: "Failed to create post",
          error,
        });
      });
      res.status(200).json({
        message: "Post successfully created",
        post: post.toJSON(),
      });
    } else {
      res.status(500).json({
        message: "No image found. Please add an image",
      });
    }
  },
  updatePost: async (req, res, next) => {
    if (req.file) {
      if (typeof req.body.post === "string") {
        req.body.post = JSON.parse(req.body.post);
      }
      const url = req.protocol + "://" + req.get("host");
      const { title } = req.body.post;
      const imageUrl = url + "/images/" + req.file.filename;
      const post = await db.Post.findByPk(req.params.id);
      post.image = imageUrl;
      if (title !== "") {
        post.title = title;
      }
      post
        .save()
        .then(() => {
          res.status(200).json({
            message: "Post saved successfully",
            post: post.toJSON(),
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Failed to save post",
            error,
          });
        });
    } else {
      req.body.post = JSON.parse(req.body.post);
      const { title } = req.body.post;
      const post = await db.Post.findByPk(req.params.id);
      if (title !== "") {
        post.title = title;
      }
      post.save();
      res.status(200).json({
        message: "Post saved successfully!",
        post: post.toJSON(),
      });
    }
  },
  deletePost: async (req, res, next) => {
    const post = await db.Post.findByPk(req.params.id);
    await post
      .destroy()
      .then(() => {
        res.status(200).json({
          message: "Successfully deleted post!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Failed to delete post!",
          error,
        });
      });
  },
  getCommentsByPostId: async (req, res, next) => {
    const post_id = req.params.id;
    await db.Comment.findAll({
      where: {
        postId: post_id,
      },
      include: [{ model: db.User, attributes: ["email"] }],
    }).then((data) => {
      if (data) {
        res.status(200).json({
          message: "Successfully retreived comments",
          comments: data,
        });
      } else {
        res.status(500).json({
          message: "Could not find comments",
        });
      }
    });
  },
  createComment: async function (req, res, next) {
    try {
      const { body } = req.body;
      const post_id = req.params.id;
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const { user_id } = decodedToken;
      db.Comment.create({
        userId: user_id,
        postId: post_id,
        body,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  recordSeen: async (req, res, next) => {
    const post_id = req.params.id;
    const token = req.headers["authorization"].split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const user_id = decodedToken.user_id;
    const user = await db.User.findByPk(user_id);
    const post = await db.Post.findByPk(post_id);
    if (!post || !user) {
      res.status(300).json({ message: "Missing items. Failed to record seen" });
    }
    await db.User_Post_Visit.findOrCreate({
      where: {
        UserId: user.id,
        PostId: post.id,
      },
    })
      .then(() => {
        res.status(200).json({
          message: "Successfully created seen record",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
