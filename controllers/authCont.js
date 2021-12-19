const { OAuth2Client } = require('google-auth-library');
const User = require("../models/employeeSchema")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const client = new OAuth2Client("369628387070-p5sv6o4j49cl4ed2id0ggrdrpm9ablpm.apps.googleusercontent.com");
exports.google = async (req, res) => {

    console.log(req.body)
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: "369628387070-p5sv6o4j49cl4ed2id0ggrdrpm9ablpm.apps.googleusercontent.com"
        });
        const payload = await ticket.getPayload();
        return payload
    }
    const payLoad = await verify()
    let userData = await User.findOne({ email: payLoad.email })
    if (userData == null) {
        res.json({ value: true })
    }
    else {
        if (userData.Password) {
            password = false;

        }
        else {
            password = true;
        }

        const token = await jwt.sign({ email: payLoad.email }, process.env.SECRET_KEY)
        res.status(200).json({ value: false, token, password })
    }

}
exports.tokenVerify = async (req, res,next) => {
    console.log(req.headers)
    if (!req.headers.authorization) {
        res.sendStatus(401)

    } else {
        if (req.headers.authorization == "null") {
            res.sendStatus(401)
        } else {
            try {
                
                verifyData = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
                req.token = verifyData
            }
            catch {
                res.sendStatus(404)
            }
        }

    }
    next()
}
exports.changepassword = async (req, res) => {
    try {

        // const token = req.token;
        // console.log(token)
        let data = await User.findOne({ email: "try1@gmail.com" })
        console.log(req.body)
        const bcryptpassword = await bcryptjs.compare(req.body.currentpassword, data.password);
        console.log(bcryptpassword + "ffffffffffffffffff")
        if (bcryptpassword == true) {
            const salt = await bcryptjs.genSalt(10)
            req.body.password = await bcryptjs.hash(req.body.password, salt)
            data = await User.findOneAndUpdate({ email: "try1@gmail.com" }, {
                $set: {
                    "password": req.body.password,
                }
            }, {
                new: true,
                useFindAndModify: false
            })
            console.log(data + "jjjj")
            res.status(200).json({
                message: "changed sucessfully"
            })
        }
        else {

            res.sendStatus(401)
        }

    }

    catch (e) {
        console.log(e)
        res.sendStatus(401)



    }

}
exports.validEmailUser = async (req, res) => {
    console.log(req.body.email)

    const valid = await User.findOne({ email: req.body.email });
    if (valid == null) {

        res.status(200).json({ value: false })
    }
    else {
        console.log(valid)
        if (valid.Active == false)
            res.status(200).json({ value: false })
        else
            res.status(200).json({ value: true })
    }
}