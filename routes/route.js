const express = require('express')
const router = express.Router();
const internCtrl = require('../controllers/internController')
const mainCtrl =require("../controllers/mainCont")
const authCtrl =require("../controllers/authCont")
const service=require("../services/service")
router.post('/register',internCtrl.adminAdd)
router.post('/internadd',internCtrl.internAdd)
router.post('/login',mainCtrl.login)

router.post("/leave",internCtrl.addLeave )
router.post("/leaveDate" ,internCtrl.leaveDate)
router.post("/validEmailUser", authCtrl.validEmailUser)
router.post("/forgotPassword",service.transporter,service.emailtoken)
router.post("/changepassword",authCtrl.changepassword)
router.post("/getUpdateStatus",internCtrl.getUpdateStatus)
router.get("/leavestatus",internCtrl.getleavestatus);
router.post("/dpr",internCtrl.addDpr);
router.post("/update", internCtrl.update);
router.get("/adminleave",internCtrl.getadminleave)
router.get("/getEmployee",internCtrl.getEmployee)
router.get("/getAllEmployee",authCtrl.tokenVerify,internCtrl.getAllEmployee)
router.get("/getdpr",internCtrl.getdprstatus)
router.post("/attendance", internCtrl.addAttendence)
router.get("/getattendence", internCtrl.getattendencestatus)
router.post("/task", internCtrl.addTask)
router.delete("/deltask",internCtrl.deletTask)
router.get("/getTask",internCtrl.getTask)
router.post("/addAnn",internCtrl.addAnn);
router.get("/getAnn",internCtrl.getAnn)
module.exports = router;