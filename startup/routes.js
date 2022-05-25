const express = require("express");

module.exports = function (app) {
  //Built in middleware
  app.use(express.json());
  app.use("/api/hobbies", require("../routes/hobbies"));
  app.use("/api/users", require("../routes/users"));
  app.use("/api/auth", require("../routes/auth"));
  app.use("/api/orders", require("../routes/orders"));
  //Custom middleware
  app.use(require("../middleware/global-middleware"));
};
