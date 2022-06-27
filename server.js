const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, './.env') });
const DbConnect = require('./config/db');
const passport = require('passport');
const passportLocal = require('./config/passport-local'); 
const MongoStore = require('connect-mongo');
const session = require('express-session');
const sassMidileware = require('node-sass-middleware');
const expressLayouts = require('express-ejs-layouts');


// setup scss
// scss midileware
app.use(sassMidileware({
    /* Options */
    src: './assets/scss'
  , dest: './assets/css'
  , debug : true
  , outputStyle: 'extended'
  , prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

//  static file accsess midilware
app.use(express.static('./assets'));

// setup layout midileware
app.use(expressLayouts);

// setup ejs templete
app.set('layout' , './Layouts/_layouts');
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));


// setup bodyParser middleware 
app.use(express.urlencoded({extended : false}));


// Establising session
app.use(session({
    name : 'bootcamp',
    secret : 'hbahsir',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store :  MongoStore.create({
        mongoUrl : `${process.env.MONGODB_SESSION_URI}`, 
        autoRemove : 'disabled'
    })
}));


// config passport midilware 
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);

// configure parent route (/)
app.use('/' , require('./routes/index'));

app.listen( process.env.PORT || port , function(err){
    if(err) {
        console.log(`Error is : ${err}`);
        return;
    }
    console.log("Server is running on the port " + process.env.PORT || port);
});

