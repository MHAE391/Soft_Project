const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.MONGODBCONNECTIONSTRING)
    .then(() => console.info("Connected successfully to MongoDB..."))
    .catch((error) =>
      console.log(
        "Cloud not connect to MongoDB...look for the Stack Trace:",
        error
      )
    );
};
