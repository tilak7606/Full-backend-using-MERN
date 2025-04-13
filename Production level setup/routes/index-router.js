const express =require('express');
const router = express.Router();
const indexController = require('../controllers/index-controller')
// indexController ki jagha direct name bhi likh sakte hai jaise ki {homeController} that's it 


// iss route ke ander jo functio(req,res){} likha hua hai ye iss route ka logic hai iss logic ko hi hum controllers ke ander rakhte hai :
// router.get('/',function(req,res){
//     res.send("hey from index router");      
// })

router.get('/',indexController.homeController);


module.exports = router;