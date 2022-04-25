const mongoose = require("mongoose");
const express = require("express");
const app = express();

const hobbies = require("./routes/hobbies");

//Connection string for all! is not a good approach
mongoose
  .connect("mongodb://localhost/Suplift")
  .then(() => console.log("Connected successfully to MongoDB..."))
  .catch((error) =>
    console.log("Cloud not connect to MongoDB...look at details: ", error)
  );

//Built in middleware
app.use(express.json());

app.use("/api/hobbies", hobbies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
