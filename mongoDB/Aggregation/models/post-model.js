const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title : String,
    content : String,
    author : {type : mongoose.Schema.Types.ObjectId , ref : "user"},
    createdAt : {type : Date, default : Date.now}

})

module.exports = mongoose.model("posts",postSchema);