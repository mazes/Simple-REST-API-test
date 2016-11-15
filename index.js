'use strict'

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const Schema = mongoose.Schema;

app.use(bodyParser.json());

var connection = mongoose.connect("mongodb://localhost:27017/test", (err) => {
    if(err){
        console.log(err);
    } else {
        console.log("connected to database");
    }
});

const User = mongoose.model("User", {
    name: String,
    age: Number
});
app.listen(5000);

app.get('/api/users',(req, res) => {
    User.find({}, function(err, docs) {
        if (err) {
            res.status(500).send("Error getting users");
        } else {
            res.status(200).send(docs);
        }
    });
});

app.post('/api/users',(req, res) => {
    let guy = new User({
        "name": req.body.name,
        "age": req.body.age
    });

    guy.save((err) => {
        if(err){
            res.send("dafuq");
        } else{
        res.status(201).send(guy);
        }
    });

    return;
});
module.exports = app;
