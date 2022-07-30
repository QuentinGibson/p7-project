const express = require("express");
const multer = require("../middleware/multer-config");
const rateLimiter = require("../middleware/rate-limit");
const auth = require("../middleware/auth");
const {
  getRecentPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  recordSeen,
  getRecentUnseenPosts,
  getCommentsByPostId,
  createComment,
} = require("../controllers/post");

const router = express.Router();

router.get("/:id", rateLimiter, getPostById);
router.get("/", getRecentPosts);
router.get("/:id/comments", rateLimiter, getCommentsByPostId);
router.post("/unseen", auth, getRecentUnseenPosts);
router.post("/:id/comments/new", auth, createComment);
router.post("/", auth, multer, rateLimiter, createPost);
router.put("/:id", auth, multer, rateLimiter, updatePost);
router.delete("/:id", auth, rateLimiter, deletePost);
router.post("/:id/seen", auth, rateLimiter, recordSeen);

module.exports = router;
