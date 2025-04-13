const randomUsername = require('../utils/random-username');


module.exports.homeController = function(req,res){
//    console.log(randomUsername());
    // res.send("Hey from server");
    let user = randomUsername();
    res.send(user);
}