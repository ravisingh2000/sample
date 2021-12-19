require('dotenv').config()
console.log("ik")
console.log("http://localhost:"+(process.env.PORT||"3000"))
const socket=io("http://localhost:"+(process.env.PORT||"3000"))

// const form= document.getElementById("send-container")
console.log(document.getElementById("messageInp"))
// const messageinput=document.getElementById("send")
// const message=document.get
console.log("jj")
document.getElementById("sending").addEventListener("submit",(e)=>{
    console.log(e)
    e.preventDefault()
    socket.emit("send",document.getElementById("messageInp").value)
})
const name=prompt("enter name")
socket.emit("user-joined",name)
socket.on("user-joined",name=>{
    console.log(document.getElementById("sends"))
    // if(document.getElementById("send") == null)
    document.getElementById('sends').innerHTML = name;
    // messageinput.innerText="dddddd"
})
socket.on("receive",name=>{
    console.log(document.getElementById("sends"))
    // if(document.getElementById("send") == null)
    console.log(name)
    var textnode = document.createTextNode(name.message);
    document.getElementById('sends').appendChild(textnode);
    // messageinput.innerText="dddddd"
})