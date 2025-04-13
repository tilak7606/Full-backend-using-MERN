const express = require('express');
const app = express();
const {userModel,validateUser} = require('./models/user-model')

app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get('/',function(req,res){
    res.send('heLLO WORLD');
})

app.post('/create',async function(req,res){
    let {name,username,email,age,contact} = req.body;
   let error =  validateUser({name,username,age,contact,email});
   if(error) return res.status(500).send(error.message);
    // let user = userModel.create({
    //     name,username,email,age,contact
    // })
    let user = await userModel.create({
        name,username,email,age,contact
    })

   res.send(user);    
})


app.listen(3000, () => console.log("server is running on the port 3000"));