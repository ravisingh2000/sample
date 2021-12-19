const jwt=require("jsonwebtoken");
const Register = require("../models/userSchema");


const auth = async (req, res, next)=>{

    try {

        const user= await Register.findOne({_id:verifyUser._id})
        next();


    } catch (error) {

        res.status(401).send(error);

    }
}

module.exports= auth;