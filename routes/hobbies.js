const express = require("express");

const router = express.Router();

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
    priceInCent: 58000,
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
    priceInCent: 152000,
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
    priceInCent: 63500,
  },
];

router.get("/", (req, res) => {
  res.status(200).send(hobbies);
});

router.get("/:id", (req, res) => {
  const hobbyEntity = hobbies.find((h) => h.id === +req.params.id);

  return !hobbyEntity
    ? res.status(404).send("The hobby with the given Id was not found")
    : res.status(200).send(hobbyEntity);
});

module.exports = router;
