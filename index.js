const mongoose = require("mongoose");
const express = require("express");
const app = express();

const globalExceptionMiddleware = require("./middleware/globalMiddleware");
const hobbies = require("./routes/hobbies");

//Connection string for all! is not a good approach
mongoose
  .connect("mongodb://localhost/Suplift")
  .then(() => console.log("Connected successfully to MongoDB..."))
  .catch((error) =>
    console.log(
      "Cloud not connect to MongoDB...look for the Stack Trace: ",
      error
    )
  );

//Built in middleware
//Should I make a Custom Middleware for handle global exceptions? and to make the app fails gracefully?
app.use(express.json());

app.use("/api/hobbies", hobbies);

app.use(globalExceptionMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
