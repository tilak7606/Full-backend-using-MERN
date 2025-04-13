const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken'); 



    module.exports.registerUser = async function(req,res) {
        console.log(req.body);
        const {name,email,password} = req.body;
        
    try{
        let user = await userModel.findOne({email});
        if(user){
            return res.status(400).send("Your account already exists, please login");
        }
        let salt = await bcrypt.genSalt();
        let hash = await bcrypt.hash(password,salt);
        // console.log(name,email,password , "This is")
        user = await userModel.create({
            name : name,
            email,
            password : hash,
        })
        // console.log(user)

        let token = generateToken({email});
        res.cookie("token",token, {
            httpOnly : true,
            secure : true,
            maxAge : 30 * 24 * 60 * 60 * 1000,
        })
        res.status(201).send(user);
    }
    catch(err){
        res.status(500).send(err.message);
    }
    };

module.exports.loginUser = async function(req,res) {
    const {email,password} = req.body;
    try{
        let user = await userModel.findOne({email});
    if(!user){
        return res.status(500).send("Email or Password is incorrect");
    }
    let result= await bcrypt.compare(password,user.password);
    if(result){
        
        let token = generateToken({email});
        res.cookie("token",token, {
            httpOnly : true,
            secure : true,
            maxAge : 30 * 24 * 60 * 60 * 1000,
        })
        res.status(201).send("logged in successfully");
    }
    else {
        return res.status(500).send("INVALID CREDENTIALS");
    }
    }
    catch(err){
        res.status(500).send(err.message);  
    }
};

module.exports.logoutUser = async function(req,res) {
       

    res.cookie("token","", {
        httpOnly : true,
        secure : true,       
    })
    res.status(200).send("logged out successfully");

};

module.exports.getUserProfile = async function(req,res) {
    // res.send("logged in ho aap");
    res.send(req.user);
};