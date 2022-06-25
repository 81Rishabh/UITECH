const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, './.env') });



app.listen( process.env.PORT || port , function(err){
    if(err) {
        console.log(`Error is : ${err}`);
        return;
    }
    console.log("Server is running on the port " + process.env.PORT || port);
});

