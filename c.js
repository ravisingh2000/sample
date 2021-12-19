const users={}
const io=require("socket.io")(8000,{
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