require('dotenv').config()
const http=require("http")
// const dotenv = require('dotenv');
const express = require("express");
const path = require("path");
const cors=require("cors")
const compression =require("compression")
const app = express();
const mongoose = require('mongoose');
const fileupload=require("express-fileupload")
console.log(__dirname + '/client/frontend')
app.use(compression({level:6,threshold:0}))
const users={}
const server = require('http').createServer(app);
const io=require("socket.io")(server,{
    cors: {
      origin: '*',
    }})

// io.set("origins","http://127.0.0.1:5500/index.html")
io.on("connection",socket=>{
     socket.on("user-joined",name=>{
         console.log("user")
         users[socket.id]=name 
         socket.broadcast.emit("user-joined",name)
     }) 
     socket.on("send",message=>{
        // users[Socket.id]=name 
        console.log("sned")
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]})
    }) 
})
app.use(fileupload({
    useTempFiles:true}
))
app.use(express.static(__dirname + '/client/frontend'));

require('./models/employeeSchema');
// var corsOption={
//             origin:"http://localhost:4200/"
//     }
// app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json())


const userRoute=require('./routes/route')
app.use("/api",userRoute);

const config = require('./db/conn');

const PORT = process.env.PORT||3000;

app.get('*', function (req, res) {

    res.sendFile(path.join(__dirname + '/client/frontend/index.html'));

});
// app.listen(PORT, ()=>{
//     console.log(`Server is running at port number ${PORT}`)
// });

server.listen((process.env.PORT || 3000), () => {
    console.log('Started');
});
