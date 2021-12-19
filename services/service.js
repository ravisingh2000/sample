const nodemailer = require("nodemailer")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
let transporter;
exports.transporter = async (req, res, next) => {
    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,

        auth: {
            user: process.env.Email,
            pass: process.env.KEY
        },
    });

    next();
}

exports.emailtoken = async (req, res, next) => {
    console.log("ghjkl")
    try {
        console.log(req.body.email)
        var expression = jwt.sign({ data: req.body.email }, process.env.SECRET_KEY, {

            expiresIn: "600s"

        });
    }
    catch (e) {
        console.log(e)
    }

    var message = {
        from: process.env.Email,
        to: req.body.email,
        subject: "ResumeBuilder Password Assistance",
        text: "Plaintext version of the message",
        html:
            `<!-- <p>confirmmail works!</p> -->
                <div class="container">
                    <div  style="height: 320px;border-radius: 5px;-webkit-border-radius: 5px;padding: 20px;background-color: #ffffff;box-shadow: 0 8px 42px 0 rgba(0, 0, 0, 0.08);">
                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome to Intern-mangement</h3></h1>
                                <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120"  />
                                  <p style="margin: 0;"> Just press the button below to change password.</p>   
                                   <button class="btn btn-primary fs-5 mt-2 "><a href="https://newresumebuilder.herokuapp.com/api/forgotpassword/${expression}">Confirm account</a></button>
                                   <h3 style="text-align:center">Or</h3>
                                   <p > 
                                    use that if button not work
                                    <br>link: https://newresumebuilder.herokuapp.com/api/forgotpassword/${expression}
                                </p> 
                </div> </div> 
                `

    };



    transporter.sendMail(message);
    res.send("sucesfull")
}