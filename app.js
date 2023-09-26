const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo");
const tryShema = new mongoose.Schema({
    name : String
});
const item = mongoose.model("task",tryShema);

app.get('/',function(req,res){
    item.find({}).then((data)=>{
        res.render("list",{ejes: data})
    })
});
app.listen("3000",function(){
    console.log("server is starting");
});
app.post('/',function(req,res){
    const itemName = req.body.ele1;
    if(itemName.length == 0){
        res.redirect('/');
        return;
    }
    const todo4 = new item({
        name: itemName
    });
    todo4.save();
    res.redirect('/');
});
app.post('/delete',function(req,res){
    const checked = req.body.checkbox1;
    item.findByIdAndRemove(checked).then((msg)=>{
        console.log(msg);
        res.redirect('/');
    });
});