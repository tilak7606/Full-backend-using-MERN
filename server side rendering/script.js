const express = require('express');
const app = express();


// steps for server side rendering :
// 1). install ejs from npm using the command -> npm i ejs 
// 2). set view engine ejs using the line app.set('view engine','ejs');
// 3). make a folder with the name views and make index.ejs file in it 
// 4). use res.render instead of res.send while rendering the pages which are int the views folder 




// about ejs file :
// browser ejs nhi samajhta vo sirf html hi samajhta hai ejs hma kuch additional features provide krati hai isi lia hum ejs use krte hai instead of using html 
// these additional features includes mathmatical computation like 2+2 = 4  






app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));



app.get('/',function(req,res) {
    res.render('index');
})

app.get('/check',function(req,res) {
    console.log(req.query)                    // get method hoga to req.query mai data milaga aur agr post method hoga to req.body mai data milaga :
    res.send('done');
})

// app.get('/profile', function(req,res) {
//     res.render('profile');
// })



// Now handeling form submission with post method :

app.post('/create' ,function(req,res) {
    console.log(req.body)
    res.send("created");
})



app.listen(3000);