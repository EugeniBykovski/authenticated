require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// @desc Create new user
// @route POST /register
// @access Private
exports.createUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name))
      res.status(400).send("All inputs us required!");

    const oldUser = await User.findOne({ email });
    if (oldUser) res.status(409).send("User already exist. Please, login!");

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
};

// @desc Login user
// @route POST /login
// @access Private
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) res.status(400).send("All inputs us required!");

    const user = await User.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
      // create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "5h" }
      );

      user.token = token;

      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
};

// @desc Welcome Page
// @route GET /welcome
// @access Public
exports.getPage = async (req, res, next) => {
  try {
    await res.status(200).send("Welcome page");
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
};
