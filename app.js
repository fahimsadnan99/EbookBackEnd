const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require("path");
const ImgUploade = require('./routes/imgUploadeRoute');
const User = require('./routes/UserRoute');
const Room = require('./routes/Room');
const ConfrimRoom = require('./routes/ConfirmRouter')



let app = express();
app.use(morgan("dev"));
app.use(express.json())
app.use(cors())


app.use("/upload", express.static(path.join(__dirname, "img/Room")));





app.use("/api/img",ImgUploade)
app.use("/api", User)
app.use("/api", Room)
app.use("/api",ConfrimRoom)

let PORT = process.env.PORT || 5001

app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`);
})

let DB= process.env.DB

mongoose.set('strictQuery', true);
mongoose.connect(DB)
 .then(()=>{
    console.log("Connected to database");
  })
  .catch(err => console.log("Database connection error"))