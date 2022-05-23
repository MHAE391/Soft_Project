const { OrderEntity }= require('../models/order');
const express = require("express");

const router = express.Router();

router.post("/",async(req,res)=>{
    let orderEntity = new OrderEntity({
        hobbyId: req.body.hobbyId,
        learnerId: req.body.learnerId,
        coachId: req.body.coachId,
        notes: req.body.notes,
    });

    if(orderEntity.learnerId === orderEntity.coachId)
    {
        return res.status(400).send("Coach and Learner must not be same");
    }

    console.log(orderEntity);
    orderEntity.save();
   // res.send(orderEntity);
})



module.exports = router;