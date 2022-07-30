const express = require("express");
const auth = require("../middleware/auth");
const {
  deleteUser,
  updateUser,
  getUser,
  getAllUserPostInformation,
  getListOfSeen,
} = require("../controllers/user");

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/posts", getAllUserPostInformation);
router.get("/:id/seen", getListOfSeen);
router.put("/", updateUser);
router.delete("/", auth, deleteUser);

module.exports = router;
