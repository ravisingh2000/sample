const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { Socket } = require('socket.io');


const Intern = require('../models/employeeSchema')

exports.login = async (req, res) => {
    try {

        const data = await Intern.findOne({ email: req.body.email });
        const bcryptpassword = await bcrypt.compare(req.body.password, data.password);
        console.log(bcryptpassword)
        if (bcryptpassword == true) {
            if (data.role == "Admin") {
                const token = jwt.sign({ email: req.body.email,role:"Admin" }, process.env.SECRET_KEY)
                res.status(200).json({
                    value: 1,
                    data: data,
                    token: token
                })
            }
            else {
                const token = jwt.sign({ email: req.body.email,role:"Intern" }, process.env.SECRET_KEY)
           
                res.status(200).json({
                    value: 2,
                    data: data,
                    token: token
                })
            }
        }
        else {
            res.sendStatus(401)
        }
    }
    catch (error) {
        res.sendStatus(401)

    }
}
