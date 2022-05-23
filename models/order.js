const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    createdAt:{
        type:Date,
        default: new Date(),
    },
    notes:{
        type:String,
        required: true
    },
    coachId:{
        type:mongoose.Types.ObjectId,
        required: true
    },
    learnerId:{
        type:String,
        required: true

    },
    hobbyId:{
        type:String,
        required: true

    }
});

const OrderEntity = mongoose.model("order",orderSchema);
exports.OrderEntity = OrderEntity; 