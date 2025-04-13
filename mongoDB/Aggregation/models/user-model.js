const { name } = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/TestingAggrigation');

const userSchema = mongoose.Schema({
    username : String,
    age : Number,
    email : String, 
    createdAt: {type: Date,default : Date.now},
    posts : [ {type : mongoose.Schema.Types.ObjectId , ref : "posts"}]
   , tags: [String],
})

module.exports = mongoose.model('users',userSchema);