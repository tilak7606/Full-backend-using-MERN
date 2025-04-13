const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(`${process.env.MONGODB_URI}/testProduction`);


let db = mongoose.connection;

db.once("open",function(){
    console.log("connected");
})

module.exports = db;