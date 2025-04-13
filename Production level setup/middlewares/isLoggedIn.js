module.exports = function(req,res,next){
    console.log("middleware chala");
    req.randomNumber = Math.random();
    next();
    // res.redirect('/');
}