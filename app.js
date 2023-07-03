const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const router = express.Router();

const app = express();

app.set('view engine', 'ejs');

const DB='mongodb+srv://user1:user123@cluster0.2vzt8bg.mongodb.net/wikidb?retryWrites=true&w=majority';

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log("database is connected to server")
}).catch((err)=>{
  console.log("err");
})

const articleSchema={
    content:String,
    title:String
}
const Article=mongoose.model("Article",articleSchema);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//................................route targeting the all method...........................................

app.route("/articles").get(function(req,res){
    Article.find({}).then(function(foundArticles){
        res.send(foundArticles);
    }).catch(function(err){
        res.send(err);
    })
})

.post(function(req,res){
   
    const newArticle= new Article({
        title:req.body.title,
        content:req.body.content
    })
    newArticle.save().then(function(){
            res.send("successfully added data");
        }).catch((err)=>{
            res.send("not added data")});
})

.delete(function(req,res){
    Article.deleteMany().then(function(){
         res.send("delete all items successfully");
    })
    .catch((err)=>{
        res.send("can't delete all items");
    })
})

//...................................................routes targeting the specific method.....................................

//localhost:3000/articles/jQuery
//app.routes("/articles/:articlesTitle")
//req.params.articleTitle="jQuery"

app.route("/articles/:articleTitle")

.get(function(req,res){
    Article.findOne({title:req.params.articleTitle}).then((foundArticle)=>{
           res.send(foundArticle);
    }).catch((err)=>{
           res.send("No articles matching");
    })
})

.put(function(req,res){
    Article,update(
        {title:req.params.articleTitle},
        {title:req.body.title,content:req.body.content},
        {overwrite:true}
    ).then(()=>{
        res.send("successfully update");
    }).then((err)=>{
        res.send("updating error");
    })
})

.patch(function(req,res){
    Article.update(
        {title:req.params.articleTitle},
        {$set:req.body}
        ).then(()=>{
            res.send("successfully update");
        }).catch((err)=>{
            res.send("not updated");
        })
})

.delete(function(req,res){
    Article.deleteOne(
        {title:req.params.articleTitle}
    ).then(()=>{
        res.send("successfully deleted");
    }).catch((err)=>{
        res.send("can't be deleted")
    })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});