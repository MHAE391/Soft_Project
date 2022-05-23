const mongoose = require('mongoose');
const Joi = require("joi");


const OrderSchema = new mongoose.Schema({
    createdAt:{
        type:Date,
        default: new Date(),
    },
   
    coachId:{
        type:mongoose.Types.ObjectId,
        required: true
    },
    learnerId:{
        type:mongoose.Types.ObjectId,
        required: true

    },
    hobbyId:{
        type:mongoose.Types.ObjectId,
        required: true

    }
});

//const OrderEntity = mongoose.model("Order",OrderSchema);

function validateAgainstErrors(orderEntity) {
    const scheme = {
      
      createdAt: Joi.required(),
      coachId: Joi.string().required(),
      learnerId: Joi.string().required(),
      hobbyId: Joi.string().required(),

      
        
    };
  
    return Joi.validate(orderEntity, scheme);
  }
exports.OrderEntity =  mongoose.model("Order",OrderSchema);; 
exports.validate = validateAgainstErrors;
