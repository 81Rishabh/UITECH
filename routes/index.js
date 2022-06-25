const express = require('express');
const router = express.Router();
const HomeController = require('../controller/HomeController');
const passport = require('passport');

router.get('/' , passport.CheckAuthentication, HomeController.home);
router.use('/employee' , require('./users'));
module.exports  = router;