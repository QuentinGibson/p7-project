const express = require("express");
const { updateComment, deleteComment } = require("../controllers/comment");
const router = express.Router();

router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
