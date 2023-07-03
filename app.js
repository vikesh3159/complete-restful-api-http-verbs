const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

const DB="mongodb+srv://viku:Vikesh@123@cluster0.2vzt8bg.mongodb.net/todolistm?retryWrites=true&w=majority";

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log("database is connected to server")
}).catch((err)=>{
  console.log("database is not connected to server");
})

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});