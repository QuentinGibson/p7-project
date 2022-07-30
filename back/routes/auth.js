const express = require("express");
const { signUp, signIn } = require("../controllers/session");
const rateLimiter = require("../middleware/rate-limit");
const router = express.Router();

router.post("/signup", rateLimiter, signUp);
router.post("/login", rateLimiter, signIn);

module.exports = router;
