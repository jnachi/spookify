const express =require('express');
const router =express.Router();
const app = express();
const mongodb = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
// mongoose = require("mongoose"), 

// User = require("./models/user"); 
  
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views',path.join(__dirname, 'views'))
app.set('view engine','hbs')
app.use(require("express-session")({ 
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }

})); 

  


router.get('',function(req,res){
    res.sendFile(path.join(__dirname,'/public/index.html'));
  
});


router.post('/log', function(req, res){
    var details = req.body;
    console.log(details)
        const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'spookify'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    db.collection('login').findOne({username : details.username}, function(err, result){
        if(result ===null){
            res.end("Login invalid");
         }else if (result.username === req.body.username && result.password === req.body.password){
             req.session.username=req.body.username;
         res.render("home");
        console.log(req.session.username)
       } else {
        res.sendFile(path.join(__dirname,'/public/index.html'));
       }

      });
})  
});


app.use('/', router);

app.listen(process.env.port || 3000);
// console.log("heloo");