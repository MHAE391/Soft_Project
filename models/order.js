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
        type:mongoose.Types.ObjectId,
        required: true

    },
    hobbyId:{
        type:mongoose.Types.ObjectId,
        required: true

    }
});

const OrderEntity = mongoose.model("order",OrderSchema);
exports.OrderEntity = OrderEntity; 