const express = require("express");

const hobbies = require("./routes/hobbies");

const app = express();

app.use("/api/hobbies", hobbies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
