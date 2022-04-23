const express = require("express");
const app = express();

const hobbies = require("./routes/hobbies");

//Built in middleware
app.use(express.json());

app.use("/api/hobbies", hobbies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
