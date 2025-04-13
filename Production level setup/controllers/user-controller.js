module.exports.userController = function(req,res){
    // res.send("hey from user controller");
    res.send(req.randomNumber.toString());
} 