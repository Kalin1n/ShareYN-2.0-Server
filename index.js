let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let mongoose = require("mongoose");
// ROUTER 
let router = require("./router/index.js");

// GET ENV VARIABLES 
let env = require("dotenv").config();
console.log("ENV  variables : ", env);

var dataBase = "mongodb+srv://kalinin:001d0fc8f72b@cluster0-ffkvc.mongodb.net/shareyn?retryWrites=true&w=majority"
mongoose.connect(dataBase,{ 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }).then(() => {
        console.log(">>>>> MONGO DB DATABASE CONNECRED <<<<<")
    }).catch((err) => {
        console.log("ERROR : ", err)
    });

// START
let app = express(); 
app.use(bodyParser.json());
app.use(cors());

// Entry point
app.use("/", router);
app.listen(process.env.PORT, ()=>{ 
    console.log("CRUD SERVER STARTED ON PORT ", process.env.PORT);
});