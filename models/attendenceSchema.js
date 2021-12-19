const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    designation: {
        type: String
    },
    morning: {
        type : Date,
        timestamp:true
    },
    evening: {
        type : Date,
        timestamp:true
    }
    
   
});
const Attendence = new mongoose.model("attendence", attendenceSchema);


module.exports = Attendence;