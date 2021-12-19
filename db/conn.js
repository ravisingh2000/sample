// const mongoose = require('mongoose');
// module.exports= {

// DB:"mongodb+srv://ravi:Computer%40123@cluster0.aavpk.mongodb.net/intern?retryWrites=true&w=majority",
// secret:'Hellotherethisismyscrettoken'
// }




const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ravi:Computer%40123@cluster0.aavpk.mongodb.net/intern?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(e);
})