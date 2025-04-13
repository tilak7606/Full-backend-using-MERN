const express= require('express');
const router = express.Router();
const {userController} = require("../controllers/user-controller");
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/',isLoggedIn,userController);


module.exports = router;