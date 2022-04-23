const Joi = require("joi");
const express = require("express");

const hobbies = require("../static-data/hobbies");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send(hobbies);
});

router.get("/:id", (req, res) => {
  const hobbyEntity = hobbies.find((h) => h.id === +req.params.id);

  return !hobbyEntity
    ? res.status(404).send("The hobby with the given Id was not found")
    : res.status(200).send(hobbyEntity);
});

router.post("/", (req, res) => {
  const hobbyEntity = {
    id: hobbies.length + 1,
    name: req.body.name,
    description: req.body.description,
    sessions: req.body.sessions,
    experienceInYears: req.body.experienceInYears,
    timeOfSessionInMinuts: req.body.timeOfSessionInMinuts,
    language: req.body.language,
    status: req.body.status,
    place: req.body.place,
    priceInCent: req.body.priceInCent,
  };

  const { error } = validateAgainstErrors(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  hobbies.push(hobbyEntity);

  return res.status(201).send(hobbyEntity); //I should redirect to get individual endpoint
});

router.put("/:id", (req, res) => {
  const hobbyEntity = hobbies.find((h) => h.id === +req.params.id);
  if (!hobbyEntity)
    return res.status(404).send("The hobby with the given Id was not found");

  const { error } = validateAgainstErrors(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Should I use something ? to map it like Auto Mapper?
  //Maybe I can refactor it
  hobbyEntity.name = req.body.name;
  hobbyEntity.description = req.body.description;
  hobbyEntity.sessions = req.body.sessions;
  hobbyEntity.experience = req.body.experience;
  hobbyEntity.timeOfSession = req.body.timeOfSession;
  hobbyEntity.language = req.body.language;
  hobbyEntity.status = req.body.status;
  hobbyEntity.place = req.body.place;
  hobbyEntity.priceInCent = req.body.priceInCent;

  return res.status(201).send(hobbyEntity);
});

router.delete("/:id", (req, res) => {
  const hobbyEntity = hobbies.find((h) => h.id === +req.params.id);
  if (!hobbyEntity)
    return res.status(404).send("The hobby with the given Id was not found");

  const hobbyEntityIndex = hobbies.indexOf(hobbyEntity);
  hobbies.splice(hobbyEntityIndex, 1);

  return res.status(204).send(hobbyEntity);
});

function validateAgainstErrors(hobbyEntity) {
  const scheme = {
    name: Joi.string().min(3).required(),
    description: Joi.string().min(30).max(3000).required(),
    sessions: Joi.number().positive().greater(0).min(2).max(100),
    experienceInYears: Joi.number().positive().greater(0).required(),
    timeOfSessionInMinuts: Joi.number()
      .positive()
      .greater(0)
      .min(10)
      .required(),
    language: Joi.string().min(3).required(),
    status: Joi.string().required(), //That's should be enum by JS got no enums
    place: Joi.string().min(3).required(),
    priceInCent: Joi.number().positive().greater(0).required(),
  };

  return Joi.validate(hobbyEntity, scheme);
}

module.exports = router;
