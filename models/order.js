const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
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

const OrderEntity = mongoose.model("order",OrderSchema);
exports.OrderEntity = OrderEntity; 