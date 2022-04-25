const express = require("express");
const Joi = require("joi");
const tools = require("../Static-data/tools");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send(tools);
});

router.get("/:id", (req, res) => {
  const toolEntity = tools.find((t) => t.id === +req.params.id);

  return !toolEntity
    ? res.status(404).send("The tool with the given Id was not found")
    : res.status(200).send(toolEntity);
});

router.post("/", (req, res) => {
  const { error } = validateErrors(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const toolEntity = {
    id: tools.length + 1,
    name: req.body.name,
    description: req.body.description,
    notes: req.body.notes,
    hobbyId: req.body.hobbyId,
  };

  tools.push(toolEntity);
  return res.status(201).send(toolEntity);
});

function validateErrors(toolEntity) {
  const scheme = {
    name: Joi.string().required().max(30),
    description: Joi.string().min(5).max(1000).required(),
    notes: Joi.string().required(),
    hobbyId: Joi.number().positive().greater(0).required(),
  };

  return Joi.validate(toolEntity, scheme);
}

module.exports = router;
