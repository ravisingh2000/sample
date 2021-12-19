const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    designation: {
        type: String
    },
    todo: {
        type : String
    },
    assignedby: {
        type: String
    },
    deadline: {
        type : Date,
        timestamp:true
    },
    
   
});
const Task = new mongoose.model("task", taskSchema);


module.exports = Task;