const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema...
const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        
    },
     photo:{
         type: String
     }
    ,
    email: {
        type: String,
       
        unique: true
    },
    password: {
        type: String,
       
        
    },
    designation: {
        type: String,
       
    },
    role:{
        type:String
    },
    phone: {
        type: String,
        
    },
    address: {
        type: String,
        
    }
   
});

employeeSchema.pre("save", async function(next) {

    if(this.isModified("password")){
      
        this.password = await bcrypt.hash(this.password, 10);
        
        this.confirmPassword = await bcrypt.hash(this.password, 10);
        
    }
    next();
});




const Employee = new mongoose.model("Employee", employeeSchema);


module.exports = Employee;