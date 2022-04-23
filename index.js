const express = require("express");
const app = express();

const hobbies = [
  {
    id: 1,
    name: "Dance",
    description: "You will learn how to dance like a bro",
    sessions: 6,
    experienceInYears: 3,
    timeOfSessionInMinuts: 30.0,
    language: "Arabic",
    status: "Offline",
    place: "Egypt",
    price: 580,
  },
  {
    id: 2,
    name: "Cooking",
    description: "You will learn how to be a Cooker like a bro",
    sessions: 8,
    experienceInYears: 10,
    timeOfSessionInMinuts: 45,
    language: "Arabic",
    status: "Online",
    place: "Egypt",
    price: 1520,
  },
  {
    id: 3,
    name: "Music",
    description: "You will learn how to be music producer like a bro",
    sessions: 10,
    experienceInYears: 8,
    timeOfSessionInMinuts: 55.0,
    language: "Arabic",
    status: "Offline",
    place: "Egypt",
    price: 635,
  },
];

app.get("/api/all-hobbies", (req, res) => {
  res.status(200).send(hobbies);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
