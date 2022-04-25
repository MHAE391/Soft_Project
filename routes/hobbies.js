const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");

const router = express.Router();

//I did not add every validator just for simplicity
const HobbyEntity = mongoose.model(
  "Hobby",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      minlength: 30,
      maxlength: 3000,
    },
    sessions: {
      type: Number,
      required: true,
      min: 2,
      max: 100,
    },
    experienceInYears: {
      type: Number,
      required: true,
    },
    timeOfSessionInMinuts: {
      type: Number,
      required: true,
      min: 10,
    },
    language: {
      type: String,
      minlength: 3,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      minlength: 3,
      required: true,
    },
    priceInCent: {
      type: Number,
      required: true,
    },
  })
);

router.get("/", async (req, res) => {
  res.status(200).send(await HobbyEntity.find().sort("name"));
});

router.get("/:id", async (req, res) => {
  const hobbyEntity = await HobbyEntity.findById(req.params.id);

  return !hobbyEntity
    ? res.status(404).send("The hobby with the given Id was not found")
    : res.status(200).send(hobbyEntity);
});

router.post("/", async (req, res) => {
  const { error } = validateAgainstErrors(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let hobbyEntity = new HobbyEntity({
    name: req.body.name,
    description: req.body.description,
    sessions: req.body.sessions,
    experienceInYears: req.body.experienceInYears,
    timeOfSessionInMinuts: req.body.timeOfSessionInMinuts,
    language: req.body.language,
    status: req.body.status,
    place: req.body.place,
    priceInCent: req.body.priceInCent,
  });

  hobbyEntity = await hobbyEntity.save();

  return res.status(201).send(hobbyEntity); //I should redirect to get individual endpoint
});

router.put("/:id", async (req, res) => {
  const { error } = validateAgainstErrors(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const hobbyEntity = await HobbyEntity.findByIdAndUpdate(
    req.params.id,
    {
      //Should I use something ? to map it like Auto Mapper?
      //Maybe I can refactor it later
      name: req.body.name,
      description: req.body.description,
      sessions: req.body.sessions,
      experience: req.body.experience,
      timeOfSession: req.body.timeOfSession,
      language: req.body.language,
      status: req.body.status,
      place: req.body.place,
      priceInCent: req.body.priceInCent,
    },
    { new: true }
  );

  if (!hobbyEntity)
    return res.status(404).send("The hobby with the given Id was not found");

  return res.status(201).send(hobbyEntity);
});

router.delete("/:id", async (req, res) => {
  const hobbyEntity = await HobbyEntity.findByIdAndRemove(req.params.id);

  if (!hobbyEntity)
    return res.status(404).send("The hobby with the given Id was not found");

  return res.status(204).send(hobbyEntity);
});

function validateAgainstErrors(hobbyEntity) {
  const scheme = {
    name: Joi.string().min(3).required(),
    description: Joi.string().min(30).max(3000).required(),
    sessions: Joi.number().positive().greater(0).min(2).max(100).required(),
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
