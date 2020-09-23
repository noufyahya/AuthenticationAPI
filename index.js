const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//import Routes 
const authRoute = require("./routes/auth");
const postRoute = require('./routes/posts');

//Initilize the dotenv
dotenv.config();

//Connect
mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true
    }, () =>
    console.log("connected to DB")
);

//Middlewares 
app.use(express.json());
app.use("/api/user", authRoute);
app.use('/api/posts', postRoute);
//Listen to the route 
app.listen(3000, () => console.log("server up and running"));