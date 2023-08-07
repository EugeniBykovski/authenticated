const express = require("express");
const { createUser, loginUser, getPage } = require("../controllers/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/welcome", auth).get(getPage);

module.exports = router;
