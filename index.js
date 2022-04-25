const express = require("express");
const app = express();

const hobbies = require("./routes/hobbies");
const tools = require("./routes/tools");


//Built in middleware
app.use(express.json());

app.use("/api/hobbies", hobbies);
app.use("/api/tools", tools);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
