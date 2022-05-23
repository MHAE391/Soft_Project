const _ = require("lodash");
const { OrderEntity, validate } = require("../models/order");

const express = require("express");
const router = express.Router();

router.post("/make-order", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const orderEntity = new OrderEntity(
    _.pick(req.body, ["hobbyId", "learnerId", "coachId"])
  );

  if (orderEntity.coachId === orderEntity.learnerId)
    return res.status(400).send("Coach and Learner must not be same");

  console.log(orderEntity);
  await orderEntity.save();

  res.status(201).send(orderEntity);
});

module.exports = router;
