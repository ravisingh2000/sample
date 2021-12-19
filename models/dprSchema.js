const mongoose = require("mongoose");
const date=new Date(Date.now())
const dprSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },

    date:{
        type:Date,
        default:new Date(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate())
    },

    dpr:{
        type: String
    }
   
});
const Dpr = new mongoose.model("dpr", dprSchema);


module.exports = Dpr;