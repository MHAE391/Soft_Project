require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();

mongoose
  .connect(process.env.MONGODBCONNECTIONSTRING)
  .then(() => console.log("Connected successfully to MongoDB..."))
  .catch((error) =>
    console.log(
      "Cloud not connect to MongoDB...look for the Stack Trace: ",
      error
    )
  );

//Built in middleware
app.use(express.json());

app.use("/api/hobbies", require("./routes/hobbies"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

app.use(require("./middleware/globalMiddleware"));

const port = process.env.PORT || 2001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
