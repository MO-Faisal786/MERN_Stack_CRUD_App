require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 5000;

require('./db/conn');

app.use(express.json());
// parse cookies to req object for auth
app.use(cookieParser())





// // it is use for some time to trace the error
// const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

// app.use(cors(corsOptions))

// we link the router file
app.use(require('./router/auth'));


app.listen(PORT, ()=>{
    console.log(`the server is listen at http://localhost:${PORT}`);

})