require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB).then(()=>{
    console.log("connection successful");
}).catch((error)=>{
    console.log(error.message);
})