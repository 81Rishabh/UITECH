const express = require("express");
const router = express.Router();

router.post('/create-student' , studentController.create);