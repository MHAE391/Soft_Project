const _ = require("lodash");
const { UserEntity, validate } = require("../models/user");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await UserEntity.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new UserEntity(
    _.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "password",
    ])
  );

  await user.save();

  res
    .status(201)
    .send(
      _.pick(user, ["_id", "firstName", "lastName", "phoneNumber", "email"])
    );
});

module.exports = router;
