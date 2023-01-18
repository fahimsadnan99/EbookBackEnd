const mongoose = require('mongoose');



let ConfirmRoomModel = mongoose.Schema({
    roomId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "room",
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    date : {
        type : Array,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
   
    address : {
        type : String,
        required : true,
    },
    amount : {
        type : Number,
        required : true, 
    }
})


module.exports = mongoose.model('confirmRoom', ConfirmRoomModel)