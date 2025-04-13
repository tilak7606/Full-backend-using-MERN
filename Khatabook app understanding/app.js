// const script = require('./script')

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
// const ejs = require('ejs')

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")));
// niche ki dono line lagne se req.body method use kar sakte hai
app.use(express.json());   
app.use(express.urlencoded({extended : true}));


app.get('/',function(req,res){

    fs.readdir(`./Files`,function(err,files){
        if(err) console.log("somethig went wrong");
        else {
            res.render('index',{files})

        }
    })
    // res.send('hello world');
})

app.get('/edit/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err,data){
        if(err) res.send("error occur");
        else{
            res.render("edit",{data,filename: req.params.filename});
        }
    })
})

app.post('/update/:filename',function(req,res){
    fs.writeFile(`./Files/${req.params.filename}`,req.body.Filedata,function(err){
        if(err) return res.send(err);
        return res.redirect('/');
    })
})

app.get('/delete/:filename',function(req,res){
    fs.unlink(`./Files/${req.params.filename}`,function(err){
        if(err) return res.send(err);
        return res.redirect('/');
    })
})

// app.get('/create',function(req,res){
//     let today = new Date();
//     let day = String(today.getDate()).padStart(2, '0');
//     let month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     let year = today.getFullYear();
    
//     // console.log(`${day}-${month}-${year}.txt`);
//     const fn = `${day}-${month}-${year}.txt`;
//     console.log(fn)
//     fs.writeFile(`./Files/${fn}`,'kuch bhi',function(err){
//         if(err) res.send("something went wrong");
//         else res.send('done');
//     })

    // res.send("done");
// })







app.listen(3000);   