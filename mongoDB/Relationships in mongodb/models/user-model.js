const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testingdb_reference");

// const postSchema = mongoose.Schema({

        // content : String,        // isme humne posts ko user ke ander hi rkaha hai iss method ko embedding kehta hai bhot hi easy hai :
//         date : {
//             type : Date,
//             default : Date.now()
//         }
    
// })

// isko handel karne ka ek aur tarika hai ki alag se ek posts ka schema bna lo bss
// const userSchema = mongoose.Schema({
//     username : String,
//     email : String,
//     password : String,
    // posts : [
    //     {
    //         content : String,        // isme humne posts ko user ke ander hi rkaha hai iss method ko embedding kehta hai bhot hi easy hai :
    //         date : {
    //             type : Date,
    //             default : Date.now()
    //         }
    //     }
    // ]
//     posts : [postSchema]
// })


const userSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    posts : [ {type : mongoose.Schema.Types.ObjectId , ref : "posts"}]
})

module.exports = mongoose.model("user",userSchema);