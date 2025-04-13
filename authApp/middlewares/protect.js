const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.protect = async function(req,res,next){
    if(req.cookies.token){
        try{
            const data = jwt.verify(req.cookies.token,process.env.JWT_SECRET);

            req.user = await userModel.findOne({email : data.email}).select("-password").select("-_id");

            next();

        }
        catch(err){
            return res.status(500).send(err.message);
        }
    }
    else{
        res.status(400).send("Not Authorized , You dont't have permission to access");
    }
}