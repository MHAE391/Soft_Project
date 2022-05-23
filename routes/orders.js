const { OrderEntity,validate }= require('../models/order');

const express = require("express");

const router = express.Router();

router.post("/",async(req,res)=>{

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let orderEntity = new OrderEntity({

        hobbyId: req.body.hobbyId,
        learnerId: req.body.learnerId,
        coachId: req.body.coachId,
       
    });

    if(orderEntity.coachId = orderEntity.learnerId)
    {
        return res.status(400).send("Coach and Learner must not be same");
    }

    console.log(orderEntity);
    await orderEntity.save();

    return res.status(201).send(orderEntity);
   //return res.send(orderEntity);
})



module.exports = router;