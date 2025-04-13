const mongoose = require('mongoose');
const debuglog = require('debug')("development:mongooseconfig")

mongoose.connect("mongodb://127.0.0.1:27017/testingdb");
// iss file mai toh sirf mongoose and mongodb ka connection setup hai
const db = mongoose.connection;

db.on("error",function(err){
    console.log(err);
})

db.on("open",function(){
    console.log('connected to database');
})