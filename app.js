require("./config/database").connect();

const express = require("express");
const app = express();

// route files
const users = require("./routes/user");

app.use(express.json({ limit: "50mb" }));
app.use("/", users);
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found!",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;
