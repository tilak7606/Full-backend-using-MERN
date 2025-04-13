const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://TilakSaini:kuchbhipassword1234@cluster0.8aqpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(function() {
        console.log("connected to database")
    })

app.get('/',function(req,res){
    res.send("hello world");
})

app.listen(3000)