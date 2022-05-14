const { HobbyEntity, validate } = require("../models/hobby");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).send(await HobbyEntity.find().sort("name"));
});

router.get("/:id", async (req, res) => {
  const hobbyEntity = await HobbyEntity.findById(req.params.id);

  return !hobbyEntity
    ? res.status(404).send("The hobby with the given Id was not found")
    : res.status(200).send(hobbyEntity);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
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
    tools: req.body.tools,
  });

  hobbyEntity = await hobbyEntity.save();

  return res.status(201).send(hobbyEntity); //I should redirect to get individual endpoint
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
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
      tools: req.body.tools,
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

module.exports = router;
