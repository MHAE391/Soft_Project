const mongoose = require("mongoose");
const Joi = require("joi");

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

exports.HobbyEntity = HobbyEntity;
exports.validate = validateAgainstErrors;
